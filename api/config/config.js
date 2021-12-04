require('dotenv').config();

let config = {
  // host: "localhost",
  // user: "root",
  // password: "my@123",
  // database: "modular_codebase"

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
  
}

module.exports = config;