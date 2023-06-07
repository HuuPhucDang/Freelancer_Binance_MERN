import httpStatus from "http-status";
import _ from "lodash";
import User from "../../models/user.model";
import UserRequest from "../../models/userRequest.model";
import Transaction from "../../models/transaction.model";
import ApiError from "../../helper/errors/ApiError";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import { ForgotPassword } from "../../interfaces/user.interfaces";
import { IUserRequestDoc } from "../../interfaces/userRequest.interface";

/**
 * Request forgot password
 */
export const requestForgotPassword = async (
  postBody: ForgotPassword
): Promise<IUserRequestDoc | null> => {
  const user = await User.findOne({ username: postBody.username });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Username not found!");
  const userRequest = await UserRequest.create({
    message: postBody.message,
    userId: user.id,
    type: "forgot_password",
  });
  return userRequest;
};

/**
 * Fetch all requests
 */
export const fetchAllRequests = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const userRequests = await Transaction.paginate(filter, options);
  return userRequests;
};
