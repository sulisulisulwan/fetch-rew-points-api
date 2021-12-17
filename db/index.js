const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

const { MYSQL_HOST, MYSQL_USR, MYSQL_PW, MYSQL_PORT, MYSQL_DB } = process.env

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USR,
  password: MYSQL_PW,
  port: MYSQL_PORT,
  database: MYSQL_DB
})

module.exports = connection.promise();


