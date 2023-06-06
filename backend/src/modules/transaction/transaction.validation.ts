import Joi from "joi";

export const actionMoney = {
  body: Joi.object()
    .keys({
      amount: Joi.number().required(),
      userId: Joi.string().required(),
    })
    .min(1),
};
