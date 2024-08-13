require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_PROD_USERNAME || process.env.DB_USERNAME,
    password: process.env.DB_PROD_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.DB_PROD_NAME || process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
