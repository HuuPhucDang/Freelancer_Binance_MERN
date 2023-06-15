import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as chatBoxService from "./chatBox.service";

export const getChatBoxes = catchAsync(async (req: Request, res: Response) => {
  const chatBoxes = await chatBoxService.getChatBoxes(
    new mongoose.Types.ObjectId(req.user.id)
  );
  res.send(responsePayload(true, "Fetch chat boxes successfully!", chatBoxes));
});

export const getAdminList = catchAsync(async (_req: Request, res: Response) => {
  const admins = await chatBoxService.getAdminList();
  res.send(responsePayload(true, "Fetch admin list successfully!", admins));
});

export const createChatRoomWithAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const admins = await chatBoxService.createChatRoomWithAdmin(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Fetch admin list successfully!", admins));
  }
);

export const getChatBoxById = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["roomId"] === "string") {
      const chatBox = await chatBoxService.getChatBoxById(
        new mongoose.Types.ObjectId(req.params["roomId"])
      );
      res.send(responsePayload(true, "Get chat box successfully!", chatBox));
    }
  }
);
