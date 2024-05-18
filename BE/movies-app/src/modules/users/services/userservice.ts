import _ from "lodash";
import ODM from "../../../common/classes/ODM.js";
import { Users } from "../models/index.js";
import tokenHandler from "../../../common/classes/tokenHandler.js";

export default class Userservice extends ODM {
  constructor() {
    super(Users);
  }

  handleLoginData(user: any) {
    const payload = this.prepareUserObjectForJWTSigning(user);
    const accessToken = tokenHandler.generateJWTAccessToken(payload);

    delete user.password;
    return {
      token: `Bearer ${accessToken}`,
      user,
    };
  }

  prepareUserObjectForJWTSigning(user: any) {
    const payload = {
      id: user.id,
      groupId: user.groupId,
      businessId: user.businessId,
      countryCode: user.countryCode,
      email: user.email,
      phone: user.phone,
      type: user.type,
    };

    return payload;
  }
}
