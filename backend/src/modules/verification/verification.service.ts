import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import { assignReturnUser } from "../../utils";
import User from "../../models/user.model";
import ApiError from "../../helper/errors/ApiError";
import {
  IUserDoc,
  UploadIDCards,
} from "../../interfaces/user.interfaces";

/**
 * Upload ID Card
 */
export const uploadIdCards = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UploadIDCards
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (user?.verification?.status === "pending")
    throw new ApiError(httpStatus.BAD_REQUEST, "You already upload ID cards!");
  if (user?.verification?.status === "approved")
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Admin has been verified your information!"
    );
  if (user?.verification?.status === "denied")
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Admin has been denied your information!"
    );

  Object.assign(user, {
    verification: { ...updateBody, status: "pending" },
  });

  await user.save();
  return assignReturnUser(user);
};
