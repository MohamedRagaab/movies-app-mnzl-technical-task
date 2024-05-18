import express from 'express';
import router from './lib/services/express/expressRouter.js'
import errorHandlerMiddleware from './common/classes/errorHandlerMiddleware.js'

import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const expressApp = express();

expressApp.use(bodyParser.json({ limit: '10mb' }));
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cors());
expressApp.use(cookieParser());
expressApp.use(helmet());
expressApp.use(express.json());
/******************* Router Middleware ************************/
expressApp.use(router);
/******************* Error Handler Middleware ******************/
expressApp.use(errorHandlerMiddleware);

export default expressApp;