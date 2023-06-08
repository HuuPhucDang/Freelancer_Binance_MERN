import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const uploadIDCards = Joi.object().keys({
  frontImage: Joi.binary().required(),
  backImage: Joi.binary().required(),
  selfieImage: Joi.binary().required(),
});

export const actionIDCard = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export const fetchVerifications = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
    populate: Joi.string(),
  }),
};
