import { Response, NextFunction } from 'express';
import _ from 'lodash';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { StatusCodes } from 'http-status-codes';
import { auth } from '../../config/index.js';
import ErrorResponse from '../classes/errorResponse.js';
import Userservice from '../../modules/users/services/userservice.js';
import { RESPONSE_MESSAGES } from '../constants.js';

const { UNAUTHORIZED } = StatusCodes;
const { secret } = auth;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new Strategy(opts, async (payload: any, done: VerifiedCallback) => {
    try {
      const issuingDate = new Date(0);
      issuingDate.setUTCSeconds(payload.iat);

      const userservice = new Userservice();
      const user = await userservice.findOne({ selector: { id: payload.id } });

      if (user) {
        user.id = parseInt(user.id);
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export const initialize = passport.initialize();

export const Authenticate = (req: any, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err) {
      return next(new ErrorResponse(err.message, UNAUTHORIZED, err.errorCode));
    }
    if (!user) {
      return next(new ErrorResponse(RESPONSE_MESSAGES.USER_IS_NOT_AUTHORIZED.MESSAGE, UNAUTHORIZED, 1));
    }
    req.user = user;
    next();
  })(req, res, next);
};
