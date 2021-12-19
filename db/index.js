const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_DATABASE } = process.env

const connection = mysql.createConnection({
  multipleStatements: true,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE
}).on('error', (err) => {
  console.error('Failed to connect with database')
  console.error(err)
})

module.exports = connection.promise();


