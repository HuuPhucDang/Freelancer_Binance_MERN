import { Document } from "mongoose";

export interface ISecurity {
  phonenumber: string;
  email: string;
  withdrawPassword: string;
  isVerified: boolean;
}

export interface ISecurityDoc extends ISecurity, Document {}

export type UpdatePhoneNumberBody = {
  phonenumber: string;
};

export type UpdateEmailBody = {
  password: string;
  email: string;
};

export type UpdateWithdrawPasswordBody = {
  password: string;
  phonenumber: string;
  email: string;
};
