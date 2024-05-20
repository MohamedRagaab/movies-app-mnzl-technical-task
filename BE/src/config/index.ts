export const environment = process.env.NODE_ENV || 'development';

export const mysql = {
  username: process.env.SQL_DB_USER_NAME || 'myuser',
  password: process.env.SQL_DB_USER_PASSWORD || 'JTACFkLAGvF0DUubBLVuS6361gg01pC8',
  database: process.env.SQL_DB_NAME || 'mydb_w1fu',
  host: process.env.SQL_DB_HOST || 'dpg-cp4h0t21hbls73f1ncn0-a.frankfurt-postgres.render.com',
  port: process.env.SQL_DB_PORT || 5432
};

export const PORT = process.env.PORT || 3000;

export const auth = {
  secret: process.env.APP_SECRET || 'the default secret',
};

export const SALT_ROUNDS = 12;