import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateSystemInfor = {
  params: Joi.object().keys({
    inforId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required(),
    bonus: Joi.number().required(),
  }),
};
