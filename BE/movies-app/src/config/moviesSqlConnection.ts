import SQLDatabase from './sqlConnection.js';
import { mysql, environment } from './index.js';

const { username, password, database, host, port } = mysql;

const config: any = {
  username,
  password,
  database,
  host,
  port,
  ssl: true,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /Deadlock/i
    ],
    max: 5,
    backoffBase: 1000,
    backoffExponent: 1.5
  },
  logging: (e: any) => console.log(e)
};

if (environment === 'testing') {
  config.storage = ':memory:';
  config.logging = true;
  delete config.dialectOptions;
}

export default class MoviesSqlConnection extends SQLDatabase {
  private static instance: MoviesSqlConnection | null = null;

  constructor() {
    super(config);

    if (!MoviesSqlConnection.instance) {
      MoviesSqlConnection.instance = this;
    }

    return MoviesSqlConnection.instance;
  }
}
