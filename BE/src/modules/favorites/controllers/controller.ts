import { Response, NextFunction } from 'express';
import { FAVORITES_ROUTES_V1 } from '../helpers/constants.js';
import { RESPONSE_MESSAGES } from '../../../common/constants.js';
import StatusCodes from 'http-status-codes';
import ErrorResponse from '../../../common/classes/errorResponse.js';
import FavoriteService from '../services/favoriteService.js';

export default {
  [FAVORITES_ROUTES_V1.FAVORITES_GET_FAVORITES]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.user;

      const favoriteService = new FavoriteService();

      const data = await favoriteService.findAll({
        selector: { userId: id }
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
  [FAVORITES_ROUTES_V1.FAVORITES_ADD_TO_FAVORITES]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        movieId,
      } = req.body;

      const { id } = req.user;

      const favoriteService = new FavoriteService();

      // check if the movie already added before
      const existedMovie = await favoriteService.findOne({
        selector: {
          userId: id,
          movieId
        }
      });

      if(existedMovie) {
        throw new ErrorResponse(
          RESPONSE_MESSAGES.MOVIE_ALREADY_ADDED.MESSAGE,
          StatusCodes.BAD_REQUEST,
          RESPONSE_MESSAGES.MOVIE_ALREADY_ADDED.CODE
        );
      }

      await favoriteService.create({
        data: {
          userId: id,
          movieId
        }
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.MESSAGE,
        code: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.CODE,
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
  [FAVORITES_ROUTES_V1.FAVORITES_REMOVE_FROM_FAVORITES]: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        movieId,
      } = req.body;
      const { id } = req.user;

      const favoriteService = new FavoriteService();

      await favoriteService.delete({
        selector: {
          userId: id,
          movieId
        }
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.MESSAGE,
        code: RESPONSE_MESSAGES.DONE_SUCCESSFULLY.CODE,
      });
    }  catch (error: any) {
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
