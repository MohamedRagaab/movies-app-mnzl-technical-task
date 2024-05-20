import Joi from "joi";
import {
  FAVORITES_ROUTES_V1
} from "../helpers/constants.js";

export default {
  [FAVORITES_ROUTES_V1.FAVORITES_GET_FAVORITES]: {
    params: Joi.object()
      .keys({
        id: Joi.number().required(),
      })
      .required(),
  },
  [FAVORITES_ROUTES_V1.FAVORITES_ADD_TO_FAVORITES]: {
    body: Joi.object()
      .keys({
        movieId: Joi.number().required()
      })
      .required()
  },
  [FAVORITES_ROUTES_V1.FAVORITES_REMOVE_FROM_FAVORITES]: {
    body: Joi.object()
      .keys({
        movieId: Joi.number().required()
      })
      .required()
  },
};
