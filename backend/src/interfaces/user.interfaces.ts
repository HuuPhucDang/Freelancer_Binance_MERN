import mongoose, { Model, Document } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";
import { AccessAndRefreshTokens } from "./token.interfaces";
import { ISecurityDoc } from "./security.interface";
import { IBankDoc } from "./bank.interface";
import { IVerificationDoc } from "./verification.interface";

export enum EUserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export interface IUser {
  username: string;
  nickname: string;
  password: string;
  inviteCode: string;
  onwCode: string;
  avatar: string;
  role: string;
  status: string;
  security: ISecurityDoc;
  verification: IVerificationDoc;
  bank: IBankDoc;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isUsernameTaken(
    username: string,
    excludeUserId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type UpdateUserAvatarBody = {
  avatar: string;
};

export type UpdateUserNicknameBody = {
  nickname: string;
};

export type ActiveUserPhonenumberBody = {
  phonenumber: string;
};

export type ActiveUserEmailBody = {
  email: string;
};

export type ChangeUserEmailBody = {
  password: string;
  email: string;
  newEmail: string;
};

export type ActiveWithdrawPasswordBody = {
  password: string;
  withdrawPassword: string;
};

export type ChangeWithdrawPasswordBody = {
  password: string;
  phonenumber: string;
  email: string;
  newWithdrawPassword: string;
};

export type ChangeUserPasswordPasswordBody = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type NewRegisteredUser = Omit<
  IUser,
  "role" | "onwCode" | "avatar" | "status" | "nickname"
> & { confirmPassword: string };

export type NewCreatedUser = Omit<
  IUser,
  "inviteCode" | "avatar" | "status" | "nickname"
>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}

export type ActiveBankBody = {
  fullname: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
};

export type UploadIDCards = {
  frontImageUrl: string;
  backImageUrl: string;
};
