import _ from "lodash";
import CronJob from "node-cron"; // es6 syntax
import fetch from "node-fetch";

const GET_PRICE_OF_TOP_TEN_URL = `https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","BNBUSDT"]`;

const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("0 */5 * * * *", async () => {
    console.log("I'm executed on a schedule!");
    const response = await fetch(GET_PRICE_OF_TOP_TEN_URL);
    const list: any = await response.json();
    const resolveData = _.map(list, (item: any) => ({
      ...item,
      newPrice: Number(item?.price) + 200,
      increament: 200
    }));
    global.io.emit("getPriceEvery5Min", resolveData);
  });
  scheduledJobFunction.start();
};

export default initScheduledJobs;
