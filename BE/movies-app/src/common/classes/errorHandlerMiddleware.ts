import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorResponse from './errorResponse.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export default (err: ErrorResponse, req: any, res: Response, next: NextFunction) => {
  res.locals.error = err;
  return res.status(err.status || INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errorCode: err.errorCode,
    errors: err.errors,
    data: err.data
  });
};
