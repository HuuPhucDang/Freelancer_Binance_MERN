import Joi from "joi";
import { password, objectId } from "../../helper/validate/custom.validation";

const createUserBody = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
    onwCode: Joi.string().required(),
  }),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

export const updateUserAvavtar = {
  body: Joi.object()
    .keys({
      avatar: Joi.string().required(),
    })
    .min(1),
};

export const updateUserNickname = {
  body: Joi.object()
    .keys({
      nickname: Joi.string().required(),
    })
    .min(1),
};

export const verifyPhonenumber = {
  body: Joi.object()
    .keys({
      phonenumber: Joi.string().required(),
    })
    .min(1),
};

export const activeUserEmail = {
  body: Joi.object()
    .keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    .min(1),
};

export const changeUserEmail = {
  body: Joi.object()
    .keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      newEmail: Joi.string().email().required(),
    })
    .min(1),
};

export const activeWithdrawPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    withdrawPassword: Joi.string().min(8).required(),
  }),
};

export const changeWithdrawPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    phonenumber: Joi.string().required(),
    email: Joi.string().email().required(),
    newWithdrawPassword: Joi.string().min(8).required(),
  }),
};

export const changeUserPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
    confirmNewPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Confirm New Password must match with New Password",
      }),
  }),
};

export const activeBank = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    bankAddress: Joi.string().required(),
  }),
};

export const uploadIDCards = Joi.object().keys({
  frontImage: Joi.binary().required(),
  backImage: Joi.binary().required(),
  selfieImage: Joi.binary().required(),
});
