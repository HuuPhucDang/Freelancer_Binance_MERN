import _ from "lodash";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";
import Coin from "../models/coin.model";
import { IUserDoc } from "../interfaces/user.interfaces";
import { ECoinCoupleTrade } from "../interfaces/tradeHistoryHistory.interface";

const ADMIN_SEED = {
  username: "binanceadmin",
  nickname: "binance admin",
  password: "M123456789",
  onwCode: "admin001",
  role: "admin",
};

/**
 * Create a Admin
 * @returns {Promise<IUserDoc>}
 */
export const createSeedAdmin = async (): Promise<IUserDoc | null> => {
  const isExistAdmin = await User.isUsernameTaken(ADMIN_SEED.username);
  if (isExistAdmin) return null;
  const savedAdmin = await User.create(ADMIN_SEED);
  await Wallet.create({
    balance: 0,
    benefit: 0.1,
    userId: savedAdmin.id,
  });
  return savedAdmin;
};

/**
 * Create a Coin
 * @returns {Promise<void>}
 */
export const createSeedCoins = async (): Promise<void> => {
  const allCoins = Object.keys(
    ECoinCoupleTrade
  ) as (keyof typeof ECoinCoupleTrade)[];

  for (const symbol of allCoins) {
    const isCoinExist = await Coin.isCoinExits(symbol);
    if (!isCoinExist) await Coin.create({ symbol });
  }
};
