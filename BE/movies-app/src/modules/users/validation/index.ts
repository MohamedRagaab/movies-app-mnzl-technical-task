import Joi from "joi";
import {
  USERS_ROUTES_V1
} from "../helpers/constants.js";

export default {
  [USERS_ROUTES_V1.USERS_GET_USER]: {
    params: Joi.object()
      .keys({
        id: Joi.number().required(),
      })
      .required(),
  },
  [USERS_ROUTES_V1.USERS_LOGIN_USER]: {
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
      .required()
  },
  [USERS_ROUTES_V1.USERS_REGISTER_USER]: {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
      .required()
  }
};
