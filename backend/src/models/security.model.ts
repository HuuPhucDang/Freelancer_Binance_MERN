import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import toJSON from "../helper/toJSON/toJSON";
import { ISecurityDoc } from "../interfaces/security.interface";

const securitySchema = new mongoose.Schema<ISecurityDoc>(
  {
    phonenumber: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    withdrawPassword: {
      type: String,
      required: false,
      private: true, // used by the toJSON plugin
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
securitySchema.plugin(toJSON);

// .replace(/\d{4}$/, "****")
securitySchema.method(
  "isWithdrawPasswordMatch",
  async function (password: string): Promise<boolean> {
    const security = this;
    return bcrypt.compare(password, security.password);
  }
);

const Security = mongoose.model<ISecurityDoc>("Security", securitySchema);

export { securitySchema };
export default Security;
