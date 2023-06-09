import { Model, Document, Schema } from "mongoose";

export enum EUserType {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCE = "advance",
  PROFESSINAL = "professional",
}

export interface IUserType {
  userId: Schema.Types.ObjectId;
  name: string;
  type: EUserType;
  probability: number;
}

export interface IUserTypeDoc extends IUserType, Document {}

export interface IUserTypeModel extends Model<IUserTypeDoc> {}
