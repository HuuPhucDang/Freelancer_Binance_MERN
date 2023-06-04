import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import ApiError from "../../helper/errors/ApiError";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import {
  NewCreatedUser,
  UpdateUserBody,
  IUserDoc,
  NewRegisteredUser,
  UpdateUserAvatarBody,
  UpdateUserNicknameBody,
  ActiveUserPhonenumberBody,
  ActiveUserEmailBody,
  ActiveWithdrawPasswordBody,
  ChangeUserPasswordPasswordBody,
  ChangeUserEmailBody,
  ChangeWithdrawPasswordBody,
} from "../../interfaces/user.interfaces";

const makeDefaultNickname = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

/**
 * Create a user
 */
export const createUser = async (
  userBody: NewCreatedUser
): Promise<IUserDoc> => {
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken!");
  }
  return User.create(userBody);
};

/**
 * Register a user
 */
export const registerUser = async (
  userBody: NewRegisteredUser
): Promise<IUserDoc> => {
  if (await User.isUsernameTaken(userBody.username))
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken!");
  const findInviter = await User.findOne({ onwCode: userBody.inviteCode });
  if (!findInviter)
    throw new ApiError(httpStatus.BAD_REQUEST, "Invite code not valid!");
  return User.create({
    ...userBody,
    nickname: `Anonymous-User-${makeDefaultNickname(6)}`,
  });
};

/**
 * Query for users
 */
export const queryUsers = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 */
export const getUserById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserDoc | null> => User.findById(id);

/**
 * Get user by email
 * @param {string} username
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByUsername = async (
  username: string
): Promise<IUserDoc | null> => User.findOne({ username });

/**
 * Update user by id
 */
export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (
    updateBody.username &&
    (await User.isUsernameTaken(updateBody.username, userId))
  )
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken!");

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user Avatar
 */
export const updateUserAvatar = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserAvatarBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user Nickname
 */
export const updateUserNickname = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserNicknameBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const checkDuplicateNickname = await User.findOne({
    nickname: updateBody.nickname,
  });
  if (checkDuplicateNickname)
    throw new ApiError(httpStatus.BAD_REQUEST, "Nickname already taken!");

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Verify user phonenumber
 */
export const verifyPhonenumber = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserPhonenumberBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    updateBody
  );

  Object.assign(user, {
    security: newSecurity,
  });
  await user.save();
  user.security.phonenumber = user.security.phonenumber.replace(
    /\d{4}$/,
    "****"
  );
  user.security.email = user.security.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  return user;
};

/**
 * Active user email
 */
export const activeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
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
  user.security.phonenumber = user.security.phonenumber.replace(
    /\d{4}$/,
    "****"
  );
  user.security.email = user.security.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  return user;
};

/**
 * Change user email
 */
export const changeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
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
  user.security.phonenumber = user.security.phonenumber.replace(
    /\d{4}$/,
    "****"
  );
  user.security.email = user.security.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  return user;
};

/**
 * Active Withdraw Password
 */
export const activeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
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
  user.security.phonenumber = user.security.phonenumber.replace(
    /\d{4}$/,
    "****"
  );
  user.security.email = user.security.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  return user;
};

/**
 * CHange Withdraw Password
 */
export const changeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
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
  user.security.phonenumber = user.security.phonenumber.replace(
    /\d{4}$/,
    "****"
  );
  user.security.email = user.security.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  return user;
};

/**
 * Change user password
 */
export const changeUserPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserPasswordPasswordBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");

  Object.assign(user, {
    password: updateBody.newPassword,
  });
  await user.save();
  if (user?.security) {
    user.security.phonenumber = user.security.phonenumber.replace(
      /\d{4}$/,
      "****"
    );
    user.security.email = user.security.email.replace(
      /(\w{3})[\w.-]+@([\w.]+\w)/,
      "$1***@$2"
    );
  }
  return user;
};
