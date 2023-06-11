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
      const newPrice = updateCoin.price + Number(data?.intervention);
      const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
      updateCoin.growth = parseFloat(newGrowth.toFixed(2));
      updateCoin.price = parseFloat(newPrice.toFixed(4));
      updateCoin.intervention = data?.intervention || 0;
      await updateCoin.save();
      const allCoins = await Coin.find().sort({ price: -1 });
      socket.emit("updateAllCoinPriceNow", allCoins);
    }
  });
  socket.on("getLatestCoins", async (_data: any, callback: any) => {
    const allCoins = await Coin.find().sort({ price: -1 });
    callback(allCoins);
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
    const moonboot = await Moonboot.findById({
      id: new mongoose.Types.ObjectId(data?.id),
    });
    if (moonboot) {
      Object.assign(
        moonboot,
        _.pick(data, "time", "limitedTime", "probability")
      );
      await moonboot.save();
    }
    const moonboots = await Moonboot.find();
    socket.emit("updateAllMoonbotNow", moonboots);
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
  socket.on("checkTradeResult", async (data: any, callback: any) => {
    const allPendingTrade = await TradeHistory.find({
      userId: new mongoose.Types.ObjectId(data?.userId),
      result: ETradeResult.PENDING,
    });
    const wallet = await Wallet.findOne({
      userId: new mongoose.Types.ObjectId(data?.userId),
    });
    for (const trade of allPendingTrade) {
      if (trade) {
        const currentCoin = await Coin.findOne({ symbol: trade.symbol });
        if (currentCoin) {
          trade.result = checkResults(
            trade.betPrice,
            currentCoin.price,
            trade.type
          );
          await trade.save();
          if (wallet) {
            wallet.balance =
              trade.result === ETradeResult.LOSE
                ? wallet.balance - trade.betAmount * trade.probability
                : wallet.balance + trade.betAmount * trade.probability;
            await wallet.save();
          }
        }
      }
    }
    callback(null);
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
