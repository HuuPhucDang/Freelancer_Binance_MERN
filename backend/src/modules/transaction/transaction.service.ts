import httpStatus from "http-status";
import _ from "lodash";
import User from "../../models/user.model";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import { IUserDoc } from "../../interfaces/user.interfaces";
import { ActionMoneyBody } from "../../interfaces/transaction.interface";

/**
 * Rechage money
 */
export const rechangeMoney = async (
  updateBody: ActionMoneyBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(updateBody.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const findInviter = await User.findOne({ onwCode: user.inviteCode });
  if (!findInviter)
    throw new ApiError(httpStatus.BAD_REQUEST, "Inviter not found!");

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
  Object.assign(findInviter, {
    wallet: newInviterWallet,
  });
  findInviter.save();
  Object.assign(user, {
    wallet: newWallet,
  });
  await user.save();

  return assignReturnUser(user);
};

export const withdrawMoney = async (
  updateBody: ActionMoneyBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(updateBody.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (user?.wallet?.balance || 0 < updateBody.amount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not withdraw more than balance!"
    );

  const newWallet = Object.assign(user?.wallet || { balance: 0, benefit: 0 }, {
    balance: user?.wallet
      ? user.wallet.balance - updateBody.amount
      : updateBody.amount,
  });
  Object.assign(user, {
    wallet: newWallet,
  });
  await user.save();

  return assignReturnUser(user);
};
