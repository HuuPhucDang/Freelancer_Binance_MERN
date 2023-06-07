import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import {
  IUserDoc,
  ActiveUserPhonenumberBody,
  ActiveUserEmailBody,
  ActiveWithdrawPasswordBody,
  ChangeUserPasswordPasswordBody,
  ChangeUserEmailBody,
  ChangeWithdrawPasswordBody,
} from "../../interfaces/user.interfaces";

/**
 * Verify user phonenumber
 */
export const verifyPhonenumber = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserPhonenumberBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    updateBody
  );

  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  return assignReturnUser(user);
};

/**
 * Active user email
 */
export const activeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");

  if (user?.security.email)
    throw new ApiError(httpStatus.BAD_REQUEST, "You already active email!");

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    { email: updateBody.email }
  );

  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  return assignReturnUser(user);
};

/**
 * Change user email
 */
export const changeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  if (user?.security?.email !== updateBody.email)
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email!");
  if (user?.security?.email === updateBody.newEmail)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The new email can not matches the old email!"
    );

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    { email: updateBody.newEmail }
  );

  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  return assignReturnUser(user);
};

/**
 * Active Withdraw Password
 */
export const activeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  if (user?.security.withdrawPassword)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already active withdraw password!"
    );

  const hashPassword = await bcrypt.hash(updateBody.withdrawPassword, 8);

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    {
      withdrawPassword: hashPassword,
    }
  );
  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  return assignReturnUser(user);
};

/**
 * CHange Withdraw Password
 */
export const changeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  if (user?.security.email !== updateBody.email)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Incorrect email or email not active!"
    );
  if (user?.security.phonenumber !== updateBody.phonenumber)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Incorrect phonenumber or phonenumber not active!"
    );
  if (
    await user?.security.isWithdrawPasswordMatch(updateBody.newWithdrawPassword)
  )
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The new password can not matches the old password!"
    );

  const hashPassword = await bcrypt.hash(updateBody.newWithdrawPassword, 8);

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    {
      withdrawPassword: hashPassword,
    }
  );

  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  return assignReturnUser(user);
};

/**
 * Change user password
 */
export const changeUserPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserPasswordPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");

  Object.assign(user, {
    password: updateBody.newPassword,
  });
  await user.save();
  return assignReturnUser(user);
};
