const mysql = require("mysql2");

exports.connection = mysql.createConnection({
  host: '192.168.******',
  user: "library_server",
  database: "library",
  password: "******",
  multipleStatements: true
});
