import httpStatus from "http-status";
import mongoose from "mongoose";
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
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (
  userBody: NewCreatedUser
): Promise<IUserDoc> => {
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  return User.create(userBody);
};

/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (
  userBody: NewRegisteredUser
): Promise<IUserDoc> => {
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  return User.create({
    ...userBody,
    nickname: `Anonymous-User-${makeDefaultNickname(6)}`,
    security: {},
    verifycation: {},
    bank: {},
  });
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
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
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
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
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  if (
    updateBody.username &&
    (await User.isUsernameTaken(updateBody.username, userId))
  )
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user Avatar
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserAvatarBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserAvatar = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserAvatarBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user Nickname
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserNicknameBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserNickname = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserNicknameBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  const checkDuplicateNickname = await User.findOne({
    nickname: updateBody.nickname,
  });
  if (checkDuplicateNickname)
    throw new ApiError(httpStatus.BAD_REQUEST, "Nickname already taken!");

  Object.assign(user, updateBody);
  await user.save();
  return user;
};
