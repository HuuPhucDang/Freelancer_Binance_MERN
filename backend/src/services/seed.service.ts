import _ from "lodash";
import User from "../models/user.model";
import { IUserDoc } from "../interfaces/user.interfaces";

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
  console.log(isExistAdmin);
  if (isExistAdmin) return null;
  const savedAdmin = await User.create(ADMIN_SEED);
  return savedAdmin;
};