import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import toJSON from "../helper/toJSON/toJSON";
import paginate from "../helper/paginate/paginate";
import { roles } from "../config/roles";
import {
  IUserDoc,
  IUserModel,
  EUserStatus,
} from "../interfaces/user.interfaces";
import { securitySchema } from "./security.model";
import { verificationSchema } from "./verification.model";
import { bankSchema } from "./bank.model";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    inviteCode: {
      type: String,
      required: false,
    },
    onwCode: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://api.dicebear.com/6.x/micah/svg?seed=Lily",
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: "active",
    },
    security: securitySchema,
    bank: bankSchema,
    verification: verificationSchema,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  "isUsernameTaken",
  async function (
    username: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
