import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger.js';

const { BAD_REQUEST } = StatusCodes;

const validateRequest = (_schema: any, validationSchemaName = 'Error') => {
  const joiValidationOptions = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true,
  };

  return (req: any, res: Response, next: NextFunction) => {
    if (_schema) {
      const validations = ['headers', 'params', 'query', 'body', 'files'].map(key => {
        const schema = _schema[key];
        const value = req[key];

        const validate = () => (schema ? schema.validateAsync(value, joiValidationOptions) : Promise.resolve({}));
        return validate().then((result: any) => ({ [key]: result }));
      });

      return Promise.all(validations)
        .then(result => {
          req.validated = Object.assign({}, ...result);
          next();
        })
        .catch(validationError => {
          const JoiError = {
            status: 'failed',
            error: {
              original: validationError._object,
              details: _.map(validationError.details, ({ message, type }) => ({
                message: message.replace(/['"]/g, ''),
                type,
              })),
            },
          };
          logger.error(`[JoiValidation][${validationSchemaName}]: ${JoiError.error.details[0].message}`);

          return res.status(BAD_REQUEST).json({
            success: false,
            message: JoiError.error.details[0].message,
            data: null,
          });
        });
    } else {
      next();
    }
  };
};

export default validateRequest;
