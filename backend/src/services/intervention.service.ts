import { Socket } from "socket.io";
import fetch from "node-fetch";
import mongoose from "mongoose";
import {
  ETradeType,
  ETradeResult,
} from "../interfaces/tradeHistoryHistory.interface";
import _ from "lodash";
import Coin from "../models/coin.model";
import TradeHistory from "../models/tradeHistory.model";
import Wallet from "../models/wallet.model";
import Moonboot from "../models/moonbot.model";

const KLINE_URL = `https://api.binance.com/api/v3/klines?`;
const AGGREGATE_URL = `https://api.binance.com/api/v3/aggTrades?`;
const GET_TICKER_24H = `https://api.binance.com/api/v3/ticker/24hr?`;
const GET_PRICE_URL = `https://api.binance.com/api/v3/avgPrice?symbol=`;

// symbol=BTCUSDT&interval=1h&limit=
const checkResults = (
  bet: number,
  newPrice: number,
  type: ETradeType
): ETradeResult => {
  switch (type) {
    case ETradeType.BUY: {
      if (bet <= newPrice) return ETradeResult.LOSE;
      else return ETradeResult.WIN;
    }
    default: {
      if (bet >= newPrice) return ETradeResult.LOSE;
      else return ETradeResult.WIN;
    }
  }
};

const intiChartSocket = (socket: Socket) => {
  socket.on("interventionCoin", async (data: any) => {
    const updateCoin = await Coin.findOne({ symbol: data?.symbol });
    if (updateCoin) {
      if (data?.intervention) {
        updateCoin.intervention = data.intervention;
        const newPrice = updateCoin.price + Number(data?.intervention);
        const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
        updateCoin.growth = parseFloat(newGrowth.toFixed(2));
        updateCoin.price = parseFloat(newPrice.toFixed(4));
      } else {
        updateCoin.intervention = 0;
        const updateUrl = `${GET_PRICE_URL}${data?.symbol}`;
        const response = await fetch(updateUrl);
        const newCoins: any = await response.json();
        const newPrice = Number(newCoins?.price);
        const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
        updateCoin.growth = parseFloat(newGrowth.toFixed(2));
        updateCoin.price = parseFloat(newPrice.toFixed(4));
      }
      await updateCoin.save();
      const allCoins = await Coin.find().sort({ price: -1 });
      global.io.emit("updateAllCoinPriceNow", allCoins);
    }
  });
  socket.on("getLatestCoins", async (_data: any, callback: any) => {
    const allCoins = await Coin.find().sort({ price: -1 });
    callback(allCoins);
  });
  socket.on("getCoinWithSymbol", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    callback(coin);
  });
  socket.on("getLatestCoinWithSymbol", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    callback(coin);
  });
  socket.on("getAllMoonboot", async (_data: any, callback: any) => {
    const moonboot = await Moonboot.find();
    callback(moonboot);
  });
  socket.on("updateMoonbot", async (data: any) => {
    const moonboot = await Moonboot.findById(data?.id);
    if (moonboot) {
      Object.assign(
        moonboot,
        _.pick(data, "time", "limitedTime", "probability")
      );
      await moonboot.save();
    }
    const moonboots = await Moonboot.find();
    global.io.emit("updateAllMoonbotNow", moonboots);
  });
  socket.on("getCoin24h", async (data: any, callback: any) => {
    const currentCoin = await Coin.findOne({ symbol: data?.symbol });
    if (currentCoin) {
      const fetchUrl = `${GET_TICKER_24H}symbol=${data?.symbol}`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const newPrice = Number(list?.lastPrice) + currentCoin.intervention;
      const newHighestPrice =
        Number(list?.highPrice) < newPrice ? newPrice : Number(list?.highPrice);
      const resolveList = {
        ...list,
        lastPrice: newPrice.toFixed(4),
        highPrice: newHighestPrice.toFixed(4),
      };
      callback(resolveList);
    }
  });
  socket.on("checkTradeResult", async (data: any) => {
    const trade = await TradeHistory.findById(
      new mongoose.Types.ObjectId(data?.tradeId)
    );
    if (trade) {
      console.log(`WAITING CHECK TRADE FOR ${data?.timeout}`, data?.tradeId);
      setTimeout(async () => {
        const currentCoin = await Coin.findOne({ symbol: trade.symbol });
        if (currentCoin) {
          trade.result = checkResults(
            trade.betPrice,
            currentCoin.price,
            trade.type
          );
          const wallet = await Wallet.findOne({
            userId: new mongoose.Types.ObjectId(data?.userId),
          });
          await trade.save();
          if (wallet) {
            const amount = trade.betAmount * trade.probability;
            const recieveAmount = ETradeResult.LOSE
              ? trade.betAmount - amount
              : trade.betAmount + amount;
            const balanceResult = wallet.balance + recieveAmount;
            wallet.balance = balanceResult;
            await wallet.save();
          }
        }
        global.io.emit("updateTradeListNow", { userId: trade.userId });
      }, data?.timeout || 1);
    }
  });
  socket.on("getAggregateTradeList", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    if (coin) {
      const fetchUrl = `${AGGREGATE_URL}symbol=${data?.symbol}&limit=${
        data?.limit || 200
      }`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const resolveResult = _.map(list, (el) => ({
        ...el,
        p: Number((parseFloat(el?.p) + coin.intervention).toFixed(4)),
        q: parseFloat(el?.q),
      }));
      callback(resolveResult);
    }
  });
  socket.on("getChartTradeList", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    if (coin) {
      const fetchUrl = `${KLINE_URL}symbol=${data?.symbol}&interval=${data?.interval}&limit=500`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      list[499][1] = String(parseFloat(list[499][1]) + coin.intervention);
      list[499][2] = String(parseFloat(list[499][2]) + coin.intervention);
      list[499][3] = String(parseFloat(list[499][3]) + coin.intervention);
      list[499][4] = String(parseFloat(list[499][4]) + coin.intervention);
      callback(list);
    }
  });
  socket.on(
    "getOneCandleTradeListWithInterval",
    async (data: any, callback: any) => {
      const coin = await Coin.findOne({ symbol: data?.symbol });
      if (coin) {
        const fetchUrl = `${KLINE_URL}symbol=${data?.symbol}&interval=${data?.interval}&limit=1`;
        const response = await fetch(fetchUrl);
        const list: any = await response.json();
        list[0][1] = String(parseFloat(list[0][1]) + coin.intervention);
        list[0][2] = String(parseFloat(list[0][2]) + coin.intervention);
        list[0][3] = String(parseFloat(list[0][3]) + coin.intervention);
        list[0][4] = String(parseFloat(list[0][4]) + coin.intervention);
        callback(list);
      }
    }
  );
};

export default intiChartSocket;
