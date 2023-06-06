import { Model, Document, Schema } from "mongoose";

export interface ISystemInfor {
  fullname: string;
  bankName: string;
  accountNumber: string;
  withdrawMessage: string;
  QRcode?: Schema.Types.ObjectId;
}

export interface ISystemInforDoc extends ISystemInfor, Document {}

export interface ISystemInforModel extends Model<ISystemInforDoc> {}
