export const environment = process.env.NODE_ENV || 'development';

export const mysql = {
  username: process.env.SQL_DB_USER_NAME || 'myuser',
  password: process.env.SQL_DB_USER_PASSWORD || 'mypassword',
  database: process.env.SQL_DB_NAME || 'mydb',
  host: process.env.SQL_DB_HOST || 'localhost',
  port: process.env.SQL_DB_PORT || 5432
};

export const PORT = process.env.PORT || 3005;

export const auth = {
  secret: process.env.APP_SECRET || 'the default secret',
};

export const SALT_ROUNDS = 12;