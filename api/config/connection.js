//put these lines in a seperate file
const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createPool(config);

module.exports = connection;