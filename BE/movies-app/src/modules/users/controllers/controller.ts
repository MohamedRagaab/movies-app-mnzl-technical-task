import { Response, NextFunction } from 'express';
import { USERS_ROUTES_V1 } from '../helpers/constants.js';
import { RESPONSE_MESSAGES } from '../../../common/constants.js';
import StatusCodes from 'http-status-codes';
import ErrorResponse from '../../../common/classes/errorResponse.js';
import Userservice from '../services/userservice.js';
import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../../../config/index.js';

export default {
  [USERS_ROUTES_V1.USERS_GET_USER]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.user;

      const userservice = new Userservice();

      const data = await userservice.findOne({
        selector: { id }
      });

      delete data.password;

      return res.status(StatusCodes.OK).json({
        success: true,
        message: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.MESSAGE,
        code: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.CODE,
        data,
      });
    } catch (error: any) {
      return next(
        new ErrorResponse(
          error.message,
          error.status || StatusCodes.INTERNAL_SERVER_ERROR,
          error.errorCode
        )
      );
    }
  },
  [USERS_ROUTES_V1.USERS_LOGIN_USER]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      const userservice = new Userservice();

      // check if the user is already existed
      const existingUser = await userservice.findOne({
        selector: { email }
      });

      if(!existingUser) {
        throw new ErrorResponse(
          RESPONSE_MESSAGES.WRONG_EMAIL_OR_PASSWORD.MESSAGE,
          StatusCodes.BAD_REQUEST,
          RESPONSE_MESSAGES.WRONG_EMAIL_OR_PASSWORD.CODE
        );
      }

      // compare the entered password with the user password
      const isMatch =
      existingUser.password &&
      (await bcrypt.compare(password, existingUser.password));

      if (!isMatch) {
        throw new ErrorResponse(
          RESPONSE_MESSAGES.WRONG_EMAIL_OR_PASSWORD.MESSAGE,
          StatusCodes.BAD_REQUEST,
          RESPONSE_MESSAGES.WRONG_EMAIL_OR_PASSWORD.CODE
        );
      }

      const data =  userservice.handleLoginData(existingUser);


      return res.status(StatusCodes.OK).json({
        success: true,
        message: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.MESSAGE,
        code: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.CODE,
        data,
      });
    } catch (error: any) {
      return next(
        new ErrorResponse(
          error.message,
          error.status || StatusCodes.INTERNAL_SERVER_ERROR,
          error.errorCode
        )
      );
    }
  },
  [USERS_ROUTES_V1.USERS_REGISTER_USER]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      const userservice = new Userservice();

      // check if the user is already existed
      const existingUser = await userservice.findOne({
        selector: { email }
      });

      if(existingUser) {
        throw new ErrorResponse(
          RESPONSE_MESSAGES.USER_ALREADY_EXISTED.MESSAGE,
          StatusCodes.BAD_REQUEST,
          RESPONSE_MESSAGES.USER_ALREADY_EXISTED.CODE
        );
      }

      const data = await userservice.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, SALT_ROUNDS)
        }
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.MESSAGE,
        code: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.CODE,
        data,
      });
    } catch (error: any) {
      return next(
        new ErrorResponse(
          error.message,
          error.status || StatusCodes.INTERNAL_SERVER_ERROR,
          error.errorCode
        )
      );
    }
  },
};
