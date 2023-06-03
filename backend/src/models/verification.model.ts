import mongoose from "mongoose";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  IVerificationDoc,
  EVerifyType,
  IVerificationModel,
} from "../interfaces/verification.interface";

const verificationSchema = new mongoose.Schema<
  IVerificationDoc,
  IVerificationModel
>(
  {
    selfieImageUrl: {
      type: String,
      required: false,
      default: "",
    },
    frontImageUrl: {
      type: String,
      required: false,
      default: "",
    },
    backImageUrl: {
      type: String,
      required: false,
      default: "",
    },
    status: {
      type: String,
      enum: EVerifyType,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
verificationSchema.plugin(toJSON);
verificationSchema.plugin(paginate);

const Verification = mongoose.model<IVerificationDoc>(
  "Verification",
  verificationSchema
);
export { verificationSchema };
export default Verification;
