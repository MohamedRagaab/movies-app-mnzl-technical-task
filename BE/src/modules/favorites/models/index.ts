import MoviesSqlDatabase from '../../../config/moviesSqlConnection.js'
import favoritesSchema from "./favorites.js";

const moviesSqlDatabase = new MoviesSqlDatabase();

/******************************* Tables *****************************************/
export const Favorites = moviesSqlDatabase.defineTable(
  favoritesSchema.tableName,
  favoritesSchema.columns,
  favoritesSchema.options
);
