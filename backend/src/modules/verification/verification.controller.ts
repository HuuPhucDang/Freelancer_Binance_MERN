import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as verificationService from "./verification.service";

export const uploadIDCards = catchAsync(async (req: Request, res: Response) => {
  const allFiles: any = req.files;
  const updateBody: any = {};
  Object.keys(allFiles).map((key: any) => {
    updateBody[`${key}Url`] = allFiles[key][0]?.id;
  });

  const user = await verificationService.uploadIdCards(
    new mongoose.Types.ObjectId(req.user.id),
    updateBody
  );
  res.send(responsePayload(true, "Active bank successfully!", user));
});

