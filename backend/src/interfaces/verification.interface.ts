import { Model, Document } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export enum EVerifyType {
  PENDING = "pending",
  DENY = "denied",
  APPROVED = "approved",
}

export interface IVerification {
  selfieImageUrl: string;
  frontImageUrl: string;
  backImageUrl: string;
  status: string;
}

export interface IVerificationDoc extends IVerification, Document {}

export interface IVerificationModel extends Model<IVerificationDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateVerificationBody = {
  selfieImage: File;
  frontImage: File;
  backImage: File;
};
