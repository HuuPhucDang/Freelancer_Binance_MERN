import { Socket } from "socket.io";
import fetch from "node-fetch";
import {
  ETradeType,
  ETradeResult,
} from "../interfaces/tradeHistoryHistory.interface";
import _ from "lodash";
import Coin from "../models/coin.model";
import TradeHistory from "../models/tradeHistory.model";
import Wallet from "../models/wallet.model";

const KLINE_URL = `https://api.binance.com/api/v3/klines?`;
const AGGREGATE_URL = `https://api.binance.com/api/v3/aggTrades?`;

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
  socket.on("checkTradeResult", async (data: any, callback: any) => {
    const trade = await TradeHistory.findById(data?.tradeId);
    if (trade) {
      const currentCoin = await Coin.findOne({ symbol: trade.symbol });
      if (currentCoin) {
        trade.result = checkResults(
          trade.betPrice,
          currentCoin.price,
          trade.type
        );
        await trade.save();
        const wallet = await Wallet.findOne({ userId: trade.userId });
        if (wallet) {
          wallet.balance =
            trade.result === ETradeResult.LOSE
              ? wallet.balance - trade.betAmount
              : wallet.balance + trade.betAmount;
          await wallet.save();
          callback({
            trade,
            wallet,
          });
        }
      }
    }
  });
  socket.on("getAggregateTradeList", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    if (coin) {
      const fetchUrl = `${AGGREGATE_URL}symbol=${data?.symbol}&limit=1`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const resolveResult = list[0];
      resolveResult["p"] = parseFloat(resolveResult["p"]) + coin.intervention;
      resolveResult["q"] = parseFloat(resolveResult["q"]);
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
