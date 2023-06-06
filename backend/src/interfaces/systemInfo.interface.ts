import { Model, Document, Schema } from "mongoose";

export interface ISystemInfor {
  QRUrl: Schema.Types.ObjectId;
  fullname: string;
  bankName: string;
  accountNumber: string;
  message: string;
}

export interface ISystemInforDoc extends ISystemInfor, Document {}

export interface ISystemInforModel extends Model<ISystemInforDoc> {}

export type UpdateSystemInforBody = {
  QRUrl: File;
  fullname: string;
  bankName: string;
  accountNumber: string;
  message: string;
};
