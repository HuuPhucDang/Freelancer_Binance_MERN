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
  VerifyUserPhonenumberBody,
  VerifyUserEmailBody,
  VerifyUserWithdrawPasswordBody,
  ChangeUserPasswordPasswordBody,
} from "../../interfaces/user.interfaces";
import { ISecurityDoc } from "../../interfaces/security.interface";
// import { IVerificationDoc } from "../../interfaces/verification.interface";

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

const checkVerifiedSecurity = (security: ISecurityDoc) => {
  return Boolean(
    security?.phonenumber && security?.email && security?.withdrawPassword
  );
};

/**
 * Verify user phonenumber
 * @param {mongoose.Types.ObjectId} userId
 * @param {VerifyUserPhonenumberBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyPhonenumber = async (
  userId: mongoose.Types.ObjectId,
  updateBody: VerifyUserPhonenumberBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    updateBody
  );

  Object.assign(user, {
    security: {
      ...newSecurity,
      isVerified: checkVerifiedSecurity(newSecurity),
    },
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
 * Verify user email
 * @param {mongoose.Types.ObjectId} userId
 * @param {VerifyUserEmailBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: VerifyUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    updateBody
  );

  Object.assign(user, {
    security: {
      ...newSecurity,
      isVerified: checkVerifiedSecurity(newSecurity),
    },
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
 * Verify user email
 * @param {mongoose.Types.ObjectId} userId
 * @param {VerifyUserWithdrawPasswordBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyUserWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: VerifyUserWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password");
  if (user.security.email !== updateBody.email)
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email");
  if (user.security.phonenumber !== updateBody.phonenumber)
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect Phonenumber");

  const hashPassword = await bcrypt.hash(updateBody.withdrawPassword, 8);

  const newSecurity = Object.assign(
    user?.security || { phonenumber: "", email: "" },
    {
      withdrawPassword: hashPassword,
    }
  );
  Object.assign(user, {
    security: {
      ...newSecurity,
      isVerified: checkVerifiedSecurity(newSecurity),
    },
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
 * @param {mongoose.Types.ObjectId} userId
 * @param {ChangeUserPasswordPasswordBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const changeUserPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserPasswordPasswordBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password");

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
