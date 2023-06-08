import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const getRoomById = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};
