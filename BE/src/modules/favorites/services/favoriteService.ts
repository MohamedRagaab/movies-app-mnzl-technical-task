import _ from "lodash";
import ODM from "../../../common/classes/ODM.js";
import { Favorites } from "../models/index.js";

export default class FavoriteService extends ODM {
  constructor() {
    super(Favorites);
  }
}
