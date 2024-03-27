const dotenv = require('dotenv');
const path = require('path');

// set environment variables
// dotenv.config({
//     path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
// });
dotenv.config();
module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    DB_CONNECTIONS: (db_name) => `${db_name}`,
    JWT_SECRET_KEY: process.env.SECRET_KEY,
}