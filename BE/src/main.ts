import expressApp from "./app.js";
import MoviesSqlConnection from "./config/moviesSqlConnection.js";
import { PORT } from "./config/index.js";
import { Users } from "./modules/users/models/index.js";

const startServer = async (): Promise<{
  server: any;
  app: typeof expressApp;
}> => {
  /********************* SQL Database Connections *************************/
  const moviesSqlConnection = new MoviesSqlConnection();
  await moviesSqlConnection.initiateConnection();
  await moviesSqlConnection.createRelations();
  await moviesSqlConnection.syncTables();
  /********************* Start NodeJs Server *****************************/
  const server = expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return { server, app: expressApp };
};

const { app } = await startServer();

export default app;
