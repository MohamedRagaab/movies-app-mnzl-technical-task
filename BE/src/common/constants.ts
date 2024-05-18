export const BASE_URL_V1 = "/api/v1";

export const RESPONSE_MESSAGES = {
  DONE_SUCCESSFULLY: {
    MESSAGE: "Done Successfully!",
    CODE: 0,
  },
  USER_IS_NOT_AUTHORIZED: {
    MESSAGE: "User is not authorized!",
    CODE: 1,
  },
  USER_ALREADY_EXISTED: {
    MESSAGE: "User is already existed!",
    CODE: 2,
  },
  WRONG_EMAIL_OR_PASSWORD: {
    MESSAGE: "Wrong email or password!",
    CODE: 3,
  }
};

export const userConfig = {
  secret: process.env.APP_SECRET || "the default secret",
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "1d"
};
