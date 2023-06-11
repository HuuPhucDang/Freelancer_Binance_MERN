import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const createNewTrade = {
  params: Joi.object().keys({
    type: Joi.string().custom(objectId),
    betAmount: Joi.number().required(),
    betPrice: Joi.number().required(),
    symbol: Joi.string().required(),
    time: Joi.string().required(),
  }),
};

