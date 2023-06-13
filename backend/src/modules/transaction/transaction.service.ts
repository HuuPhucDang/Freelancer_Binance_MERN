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
  ETransactionType,
  ETransactionStatus,
} from "../../interfaces/transaction.interface";
import { IWalletDoc } from "../../interfaces/waller.interface";
import Wallet from "../../models/wallet.model";
import { getUserById } from "../user/user.service";

/**
 * Rechage money
 */
export const getWallet = async (
  id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Types.ObjectId
): Promise<IWalletDoc> => {
  let wallet = await Wallet.findById(id);

  if (!wallet)
    wallet = await Wallet.create({
      balance: 0,
      benefit: 0.1,
      userId,
    });

  return wallet;
};

/**
 * Rechage money
 */
export const rechangeMoney = async (
  transactionId: mongoose.Types.ObjectId,
  updateBody: ActionMoneyBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(
    new mongoose.Types.ObjectId(updateBody.userId)
  );
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const findInviter = await User.findById(user.inviter);
  if (!findInviter && user.role === "user")
    throw new ApiError(httpStatus.BAD_REQUEST, "Inviter not found!");
  const rechargeTransaction = await Transaction.findOne({
    _id: transactionId,
    userId: user.id,
  });
  if (!rechargeTransaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (rechargeTransaction.status === ETransactionStatus.RESOLVED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (rechargeTransaction.status === ETransactionStatus.CANCELED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (rechargeTransaction.status === ETransactionStatus.DENIED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");

  if (findInviter) {
    const inviterWallet = await getWallet(findInviter.wallet, findInviter.id);
    const benefit = inviterWallet.benefit * rechargeTransaction.amount;
    inviterWallet.balance = inviterWallet.balance + benefit;
    await inviterWallet.save();
    findInviter.wallet = inviterWallet.id;
    await findInviter.save();
    await Transaction.create({
      userId: findInviter.id,
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("hh:mm:ss"),
      balance: inviterWallet.balance,
      amount: benefit,
      type: ETransactionType.BONUS,
      status: ETransactionStatus.RESOLVED,
    });
  }

  const userWallet = await getWallet(user.wallet, user.id);
  userWallet.balance = userWallet.balance + rechargeTransaction.amount;
  await userWallet.save();
  user.wallet = userWallet.id;
  await user.save();
  rechargeTransaction.status = ETransactionStatus.RESOLVED;
  await rechargeTransaction.save();
  const savedUser = await getUserById(user.id);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
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
  const userWallet = await getWallet(user.wallet, user.id);
  if (userWallet.balance < updateBody.amount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not withdraw more than current balance!"
    );
  const withdrawTransaction = await Transaction.findOne({
    id: transactionId,
    userId: user.id,
  });
  if (!withdrawTransaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (withdrawTransaction.status === ETransactionStatus.RESOLVED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (withdrawTransaction.status === ETransactionStatus.CANCELED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (withdrawTransaction.status === ETransactionStatus.DENIED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");

  userWallet.balance = userWallet.balance - withdrawTransaction.amount;
  await userWallet.save();
  withdrawTransaction.status = ETransactionStatus.RESOLVED;
  await withdrawTransaction.save();

  const savedUser = await getUserById(user.id);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
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
  const userWallet = await getWallet(user.wallet, user.id);
  user.wallet = userWallet.id;
  await user.save();
  const transaction = await Transaction.create({
    userId,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm:ss"),
    balance: userWallet.balance,
    amount: updateBody.amount,
    type: ETransactionType.RECHARGE,
    status: ETransactionStatus.PENDING,
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
  const userWallet = await getWallet(user.wallet, user.id);
  user.wallet = userWallet.id;
  if (userWallet.balance < updateBody.amount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not withdraw more than current balance!"
    );
  await user.save();
  const transaction = await Transaction.create({
    userId,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm:ss"),
    balance: userWallet.balance,
    amount: updateBody.amount,
    type: ETransactionType.WITHDRAW,
    status: ETransactionStatus.PENDING,
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
    userId: new mongoose.Types.ObjectId(user.id),
  });
  if (!transaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (transaction.status === ETransactionStatus.RESOLVED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (transaction.status === ETransactionStatus.DENIED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");
  if (transaction.status === ETransactionStatus.CANCELED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  transaction.status = ETransactionStatus.CANCELED;
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
  const transaction = await Transaction.findById(transactionId);
  if (!transaction)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction not found!");
  if (transaction.status === ETransactionStatus.RESOLVED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already resolved!");
  if (transaction.status === ETransactionStatus.CANCELED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already canceled!");
  if (transaction.status === ETransactionStatus.DENIED)
    throw new ApiError(httpStatus.BAD_REQUEST, "Transaction already denied!");
  transaction.status = ETransactionStatus.DENIED;
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
