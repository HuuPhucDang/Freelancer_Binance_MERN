import { Model, Document } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export interface IBank {
  fullname: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  isVerified: boolean;
}

export interface IBankDoc extends IBank, Document {}

export interface IBankModel extends Model<IBankDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateUserBankBody = Omit<IBank, "isVerified">;
