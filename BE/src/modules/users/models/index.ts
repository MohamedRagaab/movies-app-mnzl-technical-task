import favoritesSchema from '../../../modules/favorites/models/favorites.js';
import MoviesSqlDatabase from '../../../config/moviesSqlConnection.js'
import usersSchema from "./users.js";

const moviesSqlDatabase = new MoviesSqlDatabase();

/******************************* Tables *****************************************/
export const Users = moviesSqlDatabase.defineTable(
  usersSchema.tableName,
  usersSchema.columns,
  usersSchema.options
);

/******************************* Relationships *****************************************/
moviesSqlDatabase.defineRelation(
  usersSchema.tableName,
  favoritesSchema.tableName,
  moviesSqlDatabase.RELATION_TYPES.HAS_MANY,
  { foreignKey: 'userId' },
);