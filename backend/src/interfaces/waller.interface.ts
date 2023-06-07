import { Model, Document } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export interface IWallet {
  balance: number;
  benefit: number;
}

export interface IWalletDoc extends IWallet, Document {}

export interface IWalletModel extends Model<IWalletDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
