import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export enum ERequestType {
  RECHARGE = "recharge",
  WITHDRAW = "withdraw",
  CHANGE_PASSWORD = "change_password",
}

export interface ITransaction {
  userId: Schema.Types.ObjectId;
  date: string;
  time: string;
  type: string;
  message: string;
}

export interface ITransactionDoc extends ITransaction, Document {}

export interface ITransactionModel extends Model<ITransactionDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
