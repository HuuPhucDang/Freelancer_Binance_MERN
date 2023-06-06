import Joi from "joi";

export const uploadIDCards = Joi.object().keys({
  frontImage: Joi.binary().required(),
  backImage: Joi.binary().required(),
  selfieImage: Joi.binary().required(),
});
