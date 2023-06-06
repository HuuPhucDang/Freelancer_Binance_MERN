import httpStatus from "http-status";
import _ from "lodash";
import moment from "moment";
import mongoose from "mongoose";
import User from "../../models/user.model";
import Transaction from "../../models/transaction.model";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import { IUserDoc } from "../../interfaces/user.interfaces";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import {
  ActionMoneyBody,
  RequestMoneyBody,
  ITransactionDoc,
} from "../../interfaces/transaction.interface";

/**
 * Rechage money
 */
export const rechangeMoney = async (
  transactionId: mongoose.Types.ObjectId,
  updateBody: ActionMoneyBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(updateBody.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const findInviter = await User.findOne({ onwCode: user.inviteCode });
  if (!findInviter)
    throw new ApiError(httpStatus.BAD_REQUEST, "Inviter not found!");
  const rechargeTransaction = await Transaction.findOne({
    _id: transactionId,
    userId: user.id,
  });
  if (!rechargeTransaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (rechargeTransaction.status === "resolved")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (rechargeTransaction.status === "canceled")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (rechargeTransaction.status === "denied")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");

  const newWallet = Object.assign(user?.wallet || { balance: 0, benefit: 0 }, {
    balance: user?.wallet
      ? user.wallet.balance + updateBody.amount
      : updateBody.amount,
  });

  const newInviterWallet = Object.assign(
    findInviter?.wallet || { balance: 0, benefit: 0 },
    {
      balance: updateBody.amount * findInviter?.wallet?.benefit || 0,
    }
  );
  await Transaction.create({
    userId: findInviter._id,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm:ss"),
    balance: newInviterWallet.balance,
    amount: updateBody.amount * findInviter?.wallet?.benefit || 0,
    type: "bonus",
    status: "resolved",
  });
  Object.assign(findInviter, {
    wallet: newInviterWallet,
  });
  findInviter.save();
  Object.assign(user, {
    wallet: newWallet,
  });
  rechargeTransaction.status = "resolved";
  rechargeTransaction.save();
  await user.save();
  return assignReturnUser(user);
};

/**
 * Withdraw money
 */
export const withdrawMoney = async (
  transactionId: mongoose.Types.ObjectId,
  updateBody: ActionMoneyBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(updateBody.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (user?.wallet?.balance || 0 < updateBody.amount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not withdraw more than balance!"
    );
  const withdrawTransaction = await Transaction.findOne({
    _id: transactionId,
    userId: user.id,
  });
  if (!withdrawTransaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (withdrawTransaction.status === "resolved")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (withdrawTransaction.status === "canceled")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (withdrawTransaction.status === "denied")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");

  const newWallet = Object.assign(user?.wallet || { balance: 0, benefit: 0 }, {
    balance: user?.wallet
      ? user.wallet.balance - updateBody.amount
      : updateBody.amount,
  });
  withdrawTransaction.status = "resolved";
  withdrawTransaction.save();
  Object.assign(user, {
    wallet: newWallet,
  });
  await user.save();

  return assignReturnUser(user);
};

/**
 * Request recharge money
 */
export const requestRechargeMoney = async (
  userId: mongoose.Types.ObjectId,
  updateBody: RequestMoneyBody
): Promise<ITransactionDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");

  const transaction = await Transaction.create({
    userId,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm:ss"),
    balance: user?.wallet?.balance || 0,
    amount: updateBody.amount,
    type: "recharge",
    status: "pending",
  });
  await user.save();
  return transaction;
};

/**
 * Request withdraw money
 */
export const requestWithdrawMoney = async (
  userId: mongoose.Types.ObjectId,
  updateBody: RequestMoneyBody
): Promise<ITransactionDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const transaction = await Transaction.create({
    userId,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm:ss"),
    balance: user?.wallet?.balance || 0,
    amount: updateBody.amount,
    type: "withdraw",
    status: "pending",
  });
  await user.save();
  return transaction;
};

/**
 * Cancel Transaction
 */
export const cancelTransaction = async (
  userId: mongoose.Types.ObjectId,
  transactionId: mongoose.Types.ObjectId
): Promise<ITransactionDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId: user.id,
  });
  if (!transaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (transaction.status === "resolved")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (transaction.status === "denied")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");
  if (transaction.status === "canceled")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  transaction.status = "canceled";
  await transaction.save();
  return transaction;
};

/**
 * Deny Transaction
 */
export const denyTransaction = async (
  userId: mongoose.Types.ObjectId,
  transactionId: mongoose.Types.ObjectId
): Promise<ITransactionDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId: user.id,
  });
  if (!transaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (transaction.status === "resolved")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (transaction.status === "canceled")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (transaction.status === "denied")
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");
  transaction.status = "denied";
  await transaction.save();
  return transaction;
};

/**
 * Fetch transactions
 */
export const fetchTransactions = async (
  userId: mongoose.Types.ObjectId,
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const filterBy: any = {};
  if (user.role === "user") filterBy.userId = userId;

  const transactions = await Transaction.paginate(
    { ...filter, ...filterBy },
    options
  );
  return transactions;
};
