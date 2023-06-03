import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import paginate from "../helper/paginate/paginate";
import { IBankDoc, IBankModel } from "../interfaces/bank.interface";

const bankSchema = new mongoose.Schema<IBankDoc, IBankModel>(
  {
    fullname: {
      type: String,
      required: false,
      default: "",
    },
    bankName: {
      type: String,
      required: false,
      default: "",
    },
    bankAddress: {
      type: String,
      required: false,
      default: "",
    },
    accountNumber: {
      type: String,
      required: false,
      default: "",
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
bankSchema.plugin(toJSON);
bankSchema.plugin(paginate);

const Bank = mongoose.model<IBankDoc, IBankModel>("Bank", bankSchema);

export { bankSchema };
export default Bank;
