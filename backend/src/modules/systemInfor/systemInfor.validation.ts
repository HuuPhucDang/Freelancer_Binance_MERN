import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateSystemInfor = {
  params: Joi.object().keys({
    inforId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    message: Joi.string().required(),
    QRCode: Joi.binary().required(),
  }),
};
