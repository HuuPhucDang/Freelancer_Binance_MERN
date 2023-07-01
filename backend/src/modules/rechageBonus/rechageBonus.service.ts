import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import RechangeBonus from "../../models/rechageBonus.model";
import ApiError from "../../helper/errors/ApiError";
import {
  IRechangeBonusDoc,
  UpdateRechangeBonusBody,
} from "../../interfaces/rechangeBonus.interface";

export const getSystemInfor = async (): Promise<IRechangeBonusDoc[]> => {
  const findAll = await RechangeBonus.find();
  return findAll;
};

export const updateSystemInfo = async (
  inforId: mongoose.Types.ObjectId,
  updateBody: UpdateRechangeBonusBody
): Promise<IRechangeBonusDoc | null> => {
  const systemInfor = await RechangeBonus.findOne(inforId);
  if (!systemInfor)
    throw new ApiError(httpStatus.NOT_FOUND, "Bonus not found!");
  Object.assign(systemInfor, updateBody);
  await systemInfor.save();
  return systemInfor;
};
