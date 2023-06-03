import mongoose from "mongoose";
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
      minlength: 8,
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

export { securitySchema };

const Security = mongoose.model<ISecurityDoc>("Security", securitySchema);

export default Security;
