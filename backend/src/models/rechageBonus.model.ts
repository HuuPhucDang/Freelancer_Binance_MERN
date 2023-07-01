import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  IRechangeBonusDoc,
  IRechangeBonusModel,
} from "../interfaces/rechangeBonus.interface";

const rechageBonus = new mongoose.Schema<
  IRechangeBonusDoc,
  IRechangeBonusModel
>(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    amount: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: 0,
    },
    bonus: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rechageBonus.plugin(toJSON);

const RechageBonus = mongoose.model<IRechangeBonusDoc>(
  "RechageBonus",
  rechageBonus
);
export { rechageBonus };
export default RechageBonus;
