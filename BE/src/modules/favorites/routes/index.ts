import express from 'express';
import { FAVORITES_ROUTES_V1 } from '../helpers/constants.js';
import controller from '../controllers/controller.js';
import validationSchema from '../validation/index.js';
import validateRequest from '../../../common/middleware/joi.js';
import { Authenticate } from '../../../common/middleware/auth.js';


const Router = express.Router();

Router.get(
    '/',
    Authenticate,
    controller[FAVORITES_ROUTES_V1.FAVORITES_GET_FAVORITES]
);

Router.post(
    '/add',
    Authenticate,
    validateRequest(validationSchema[FAVORITES_ROUTES_V1.FAVORITES_ADD_TO_FAVORITES]),
    controller[FAVORITES_ROUTES_V1.FAVORITES_ADD_TO_FAVORITES]
);

Router.post(
    '/remove',
    Authenticate,
    validateRequest(validationSchema[FAVORITES_ROUTES_V1.FAVORITES_REMOVE_FROM_FAVORITES]),
    controller[FAVORITES_ROUTES_V1.FAVORITES_REMOVE_FROM_FAVORITES]
);

export default Router;