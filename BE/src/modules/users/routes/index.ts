import express from 'express';
import { USERS_ROUTES_V1 } from '../helpers/constants.js';
import controller from '../controllers/controller.js';
import validationSchema from '../validation/index.js';
import validateRequest from '../../../common/middleware/joi.js';
import { Authenticate } from '../../../common/middleware/auth.js';


const Router = express.Router();

Router.get(
    '/:id',
    Authenticate,
    controller[USERS_ROUTES_V1.USERS_GET_USER]
);

Router.post(
    '/',
    validateRequest(validationSchema[USERS_ROUTES_V1.USERS_REGISTER_USER]),
    controller[USERS_ROUTES_V1.USERS_REGISTER_USER]
);

Router.post(
    '/login',
    validateRequest(validationSchema[USERS_ROUTES_V1.USERS_LOGIN_USER]),
    controller[USERS_ROUTES_V1.USERS_LOGIN_USER]
);

export default Router;