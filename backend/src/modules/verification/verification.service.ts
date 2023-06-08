import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import moment from "moment";
import { assignReturnUser } from "../../utils";
import Notification from "../../models/notification.model";
import ApiError from "../../helper/errors/ApiError";
import { IUserDoc, UploadIDCards } from "../../interfaces/user.interfaces";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import Verification from "../../models/verification.model";
import { getUserById } from "../user/user.service";

/**
 * Upload ID Card
 */
export const uploadIdCards = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UploadIDCards
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  let findVerification = await Verification.findOne({ userId });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!findVerification) {
    findVerification = await Verification.create({
      ...updateBody,
      userId,
    });
    user.verification = findVerification.id;
    (await user.save()).populate("verification");
    return assignReturnUser(user);
  }
  if (findVerification.status === "pending")
    throw new ApiError(httpStatus.BAD_REQUEST, "You already upload ID cards!");
  if (findVerification.status === "approved")
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Admin has been verified your information!"
    );
  if (findVerification.status === "denied")
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Admin has been denied your information!"
    );

  Object.assign(findVerification, {
    updateBody,
    status: "pending",
  });
  await findVerification.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

export const changeIDCardStatus = async (
  userId: mongoose.Types.ObjectId,
  status: "denined" | "approved"
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const findVerification = await Verification.findOne({ userId });
  if (!findVerification)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not find any verification!"
    );
  if (findVerification?.status === "approved")
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This ID card has been verified!"
    );
  if (findVerification?.status === "denied")
    throw new ApiError(httpStatus.BAD_REQUEST, "This ID card has been deined!");

  await Notification.create({
    userId: user.id,
    message: `Your ID cards has been ${status} at ${moment().format(
      "DD/MM/YYYY hh:mm:ss"
    )}!`,
  });

  Object.assign(findVerification, {
    verification: { ...user.verification, status },
  });

  await findVerification.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

export const fetchAllIDCards = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const allVerifications = Verification.paginate(filter, options);
  return allVerifications;
};
