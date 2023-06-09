import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import User from "../../models/user.model";
import UserType from "../../models/userType.model";
import Wallet from "../../models/wallet.model";
import ApiError from "../../helper/errors/ApiError";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import {
  NewCreatedUser,
  UpdateUserBody,
  IUserDoc,
  NewRegisteredUser,
  UpdateUserAvatarBody,
  UpdateUserNicknameBody,
  UpdateUserTypeBody,
} from "../../interfaces/user.interfaces";
import { assignReturnUser } from "../../utils";
import { EUserType } from "../../interfaces/userType.interface";

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
  const user = await User.create({
    ...userBody,
    nickname: `Anonymous-User-${makeDefaultNickname(6)}`,
    inviter: findInviter.id,
  });
  const userType = await UserType.create({
    name: EUserType.BEGINNER,
    userId: user.id,
    probability: 0.1,
  });
  const wallet = await Wallet.create({
    balance: 0,
    userId: user.id,
  });
  user.userType = userType.id;
  user.wallet = wallet.id;
  await user.save();
  return user;
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
): Promise<IUserDoc | null> => {
  const user = await User.findById(id)
    .populate("verification")
    .populate("wallet")
    .populate("security")
    .populate("bank")
    .populate("userType");
  if (!user) return null;
  return assignReturnUser(user);
};

/**
 * Get user by ownerCode
 */
export const getUserByOwnerCode = async (
  onwCode: string
): Promise<IUserDoc | null> => {
  const user = await User.find({ onwCode })
    .populate("verification")
    .populate("wallet")
    .populate("security")
    .populate("bank")
    .populate("userType");
  if (!user) return null;
  return assignReturnUser(user);
};

/**
 * Get user by email
 * @param {string} username
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByUsername = async (
  username: string
): Promise<IUserDoc | null> => {
  const user = await User.findOne({ username })
    .populate("verification")
    .populate("wallet")
    .populate("security")
    .populate("bank")
    .populate("userType");
  if (!user) return null;
  return assignReturnUser(user);
};

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
 * Update user type
 */
export const updateUserType = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserTypeBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  let userType = await UserType.findOne({ userId });
  if (!userType) {
    userType = await UserType.create({
      name: updateBody.userType,
      type: updateBody.userType,
      userId: user.id,
      probability: 0.1,
    });
    user.userType = userType.id;
    await user.save();
    return await getUserById(userId);
  }
  userType.type = updateBody.userType;
  userType.name = updateBody.userType;
  await userType.save();
  global.io.emit("updateUserTypeNow", { userId });
  return await getUserById(userId);
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
  return assignReturnUser(user);
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
  return assignReturnUser(user);
};
