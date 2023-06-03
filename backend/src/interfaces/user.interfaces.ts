import mongoose, { Model, Document } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";
import { AccessAndRefreshTokens } from "./token.interfaces";

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
