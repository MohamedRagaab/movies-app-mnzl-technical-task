import jwt from "jsonwebtoken";
import logger from "../../config/logger.js";
import { userConfig } from "../constants.js";

class TokenHandler {
  generateJWTAccessToken(userPayload: any) {
    logger.info(
      `[TokenHandler][generateJWTAccessToken] : ${JSON.stringify(userPayload)}`
    );
    const accessToken = jwt.sign(userPayload, userConfig.secret, {
      expiresIn: userConfig.accessTokenExpiration,
    });
    return accessToken;
  }
}


export default new TokenHandler();