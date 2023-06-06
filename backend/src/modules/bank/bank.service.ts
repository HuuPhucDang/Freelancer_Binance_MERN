import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import User from "../../models/user.model";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import {
  IUserDoc,
  ActiveBankBody,
} from "../../interfaces/user.interfaces";

export const activeBank = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveBankBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (user?.bank?.isVerified)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already active bank account!"
    );

  Object.assign(user, {
    bank: updateBody,
  });

  await user.save();
  return assignReturnUser(user);
};
