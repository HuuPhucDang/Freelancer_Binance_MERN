import httpStatus from "http-status";
import _ from "lodash";
import mongoose from "mongoose";
import ApiError from "../../helper/errors/ApiError";
import {
  ITradeHistoryDoc,
  CreateNewTradeBody,
} from "../../interfaces/tradeHistoryHistory.interface";
import { EUserType } from "../../interfaces/userType.interface";
import TradeHistory from "../../models/tradeHistory.model";
import Wallet from "../../models/wallet.model";
import UserType from "../../models/userType.model";
import { getUserById } from "../user/user.service";
import moment from "moment";

const LIMIT_BET = {
  [EUserType.BEGINNER]: ["30s"],
  [EUserType.INTERMEDIATE]: ["30s", "60s"],
  [EUserType.ADVANCE]: ["30s", "60s", "120s"],
  [EUserType.PROFESSINAL]: ["30s", "60s", "120s", "150s"],
};

/**
 * Create new Trade
 */
export const createNewTrade = async (
  userId: mongoose.Types.ObjectId,
  createBody: CreateNewTradeBody
): Promise<ITradeHistoryDoc> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const wallet = await Wallet.findOne({ userId });
  if (!wallet)
    throw new ApiError(httpStatus.BAD_REQUEST, "User not active wallet!");
  if (wallet.balance < createBody.betAmount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your balance is not enough to play!"
    );
  const userType = await UserType.findOne({ userId });
  if (!userType || !LIMIT_BET[userType.type].includes(createBody.time))
    throw new ApiError(httpStatus.BAD_REQUEST, "Your level lower bet level!");
  wallet.balance = wallet.balance - createBody.betAmount;
  await wallet.save();
  const savedTrade = await TradeHistory.create({
    ...createBody,
    userId,
    betTime: moment().format("DD/MM/YYYY hh:mm:ss"),
  });
  // global.io.emit("updateTradeListNow", { userId });
  return savedTrade;
};

/**
 * fetch all trades
 */
export const fetchAllTrades = async (
  userId: mongoose.Types.ObjectId
): Promise<ITradeHistoryDoc[]> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  return await TradeHistory.find({ userId }).sort({ betTime: -1 });
};
