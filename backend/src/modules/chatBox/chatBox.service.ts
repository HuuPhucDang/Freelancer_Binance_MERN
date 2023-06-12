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

export const getChatBoxes = async (
  userId: mongoose.Types.ObjectId
): Promise<IChatBoxDoc[]> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  let chatRooms: IChatBoxDoc[] = [];
  if (user.role === "admin") {
    chatRooms = await ChatBox.find({ receiverId: userId })
      .populate("messages")
      .populate("senderId");
  } else {
    const userChatBox = await ChatBox.findOne({ senderId: userId })
      .populate("messages")
      .populate("messages.senderId")
      .populate("messages.receiverId")
      .populate("senderId")
      .populate("receiverId");
    const admin = await User.findOne({ role: "admin" });
    if (!admin) throw new ApiError(httpStatus.NOT_FOUND, "Admin not found!");
    if (!userChatBox) {
      const newChatBox = await ChatBox.create({
        senderId: userId,
        receiverId: admin.id,
      });
      chatRooms.push(newChatBox);
    } else chatRooms.push(userChatBox);
  }
  return chatRooms;
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
