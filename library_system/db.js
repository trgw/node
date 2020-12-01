const mysql = require("mysql2");

exports.connection = mysql.createConnection({
  host: '192.168.******',
  user: "***",
  database: "library",
  password: "******",
  multipleStatements: true
});
