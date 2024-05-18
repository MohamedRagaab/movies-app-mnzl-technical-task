import MoviesSqlDatabase from '../../../config/moviesSqlConnection.js'
import usersSchema from "./users.js";

const moviesSqlDatabase = new MoviesSqlDatabase();

/******************************* Tables *****************************************/
export const Users = moviesSqlDatabase.defineTable(
  usersSchema.tableName,
  usersSchema.columns,
  usersSchema.options
);
