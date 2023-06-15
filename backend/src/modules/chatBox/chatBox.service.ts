import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import ApiError from "../../helper/errors/ApiError";
import User from "../../models/user.model";
import ChatBox from "../../models/chatBox.model";
import ChatMessage from "../../models/chatMessage.model";
import {
  IChatBoxDoc,
  CreateMessageBody,
  EChatBox,
} from "../../interfaces/chatBox.interface";
import { IUserDoc } from "../../interfaces/user.interfaces";

export const getChatBoxes = async (
  userId: mongoose.Types.ObjectId
): Promise<IChatBoxDoc[]> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (user.role === "admin")
    return await ChatBox.find({ receiverId: userId })
      .populate("messages")
      .populate("senderId")
      .populate("receiverId")
      .populate("messages.senderId")
      .populate("messages.receiverId");
  else
    return await ChatBox.find({ senderId: userId })
      .populate("messages")
      .populate("senderId")
      .populate("receiverId")
      .populate("messages.senderId")
      .populate("messages.receiverId");
};

export const getAdminList = async (): Promise<IUserDoc[]> => {
  return await User.find({ role: "admin" });
};

export const createChatRoomWithAdmin = async (
  userId: mongoose.Types.ObjectId,
  createBody: { adminId: string }
): Promise<IChatBoxDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const admin = await User.findById(
    new mongoose.Types.ObjectId(createBody.adminId)
  );
  if (!admin) throw new ApiError(httpStatus.NOT_FOUND, "Admin not found!");
  return await ChatBox.create({
    senderId: user.id,
    receiverId: admin.id,
  });
};

export const getChatBoxById = async (
  roomId: mongoose.Types.ObjectId
): Promise<IChatBoxDoc | null> => {
  return await ChatBox.findById(roomId)
    .populate("messages")
    .populate("messages.senderId")
    .populate("messages.receiverId");
};

export const createMessage = async (
  userId: string,
  updateBody: CreateMessageBody
): Promise<IChatBoxDoc | null> => {
  const sender = await User.findById(new mongoose.Types.ObjectId(userId));
  if (!sender) return null;
  const receiver = await User.findById(
    new mongoose.Types.ObjectId(updateBody.receiverId)
  );
  if (!receiver) return null;
  const chatRoom = await ChatBox.findById(
    new mongoose.Types.ObjectId(updateBody.roomId)
  );
  if (!chatRoom) return null;

  const newMessage = await ChatMessage.create({
    senderId: sender.id,
    receiverId: receiver.id,
    message: updateBody.message,
    roomId: chatRoom.id,
  });

  chatRoom.messages = [...chatRoom.messages, newMessage.id];
  chatRoom.status = EChatBox.UNREAD;
  await chatRoom.save();
  const savedChatRoom = await ChatBox.findById(chatRoom.id)
    .populate("messages")
    .populate("messages.senderId")
    .populate("messages.receiverId")
    .populate("senderId")
    .populate("receiverId");
  return savedChatRoom;
};
