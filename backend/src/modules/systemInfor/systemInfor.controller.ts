import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as systemInforService from "./systemInfor.service";

export const getSystemInfor = catchAsync(
  async (_req: Request, res: Response) => {
    const infor = await systemInforService.getSystemInfor();
    res.send(responsePayload(true, "Get system infor successfully!", infor));
  }
);

export const updateSystemInfor = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["inforId"] === "string") {
      const allFiles: any = req.files;
      const updateBody: any = {
        QRUrl: allFiles?.QRCode[0]?.id,
      };
      const user = await systemInforService.updateSystemInfo(
        new mongoose.Types.ObjectId(req.params["inforId"]),
        { ...req.body, ...updateBody }
      );
      res.send(
        responsePayload(true, "Update system infor successfully!", user)
      );
    }
    res.send(responsePayload(false, "Update system infor failure!", null));
  }
);
