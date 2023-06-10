import _ from "lodash";
import CronJob from "node-cron";
import fetch from "node-fetch";
import { ECoinCoupleTrade } from "../interfaces/tradeHistoryHistory.interface";
import Coin from "../models/coin.model";

const GET_PRICE_OF_TOP_TEN_URL = `https://api.binance.com/api/v3/ticker/price?symbols=`;

const initScheduledJobs = () => {
  const scheduledUpdateCoinPrice = CronJob.schedule(
    "*/30 * * * * *",
    async () => {
      console.info("===RUN CRON UPDATE PRICE OF TOP 10===");
      const allCoins = Object.keys(
        ECoinCoupleTrade
      ) as (keyof typeof ECoinCoupleTrade)[];
      const updateUrl = `${GET_PRICE_OF_TOP_TEN_URL}${JSON.stringify(
        allCoins
      )}`;
      const response = await fetch(updateUrl);
      const newCoins: any = await response.json();
      for (const coin of newCoins) {
        const updateCoin = await Coin.findOne({ symbol: coin?.symbol });
        if (updateCoin) {
          const newPrice = Number(coin?.price || "0") + updateCoin.intervention;
          const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
          updateCoin.growth = parseFloat(newGrowth.toFixed(2));
          updateCoin.price = parseFloat(newPrice.toFixed(4));
          await updateCoin.save();
        }
      }
      const allSavedCoins = await Coin.find().sort({ price: -1 });
      global.io.emit("updateAllCoinPriceNow", allSavedCoins);
    }
  );
  scheduledUpdateCoinPrice.start();
};

export default initScheduledJobs;
