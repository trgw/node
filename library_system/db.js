let mysql = require("mysql2");

exports.connection = mysql.createConnection({
  host: '192.168.1.182',
  user: "library_server",
  database: "library",
  password: "ubiq2005tech_5_virtual",
  multipleStatements: true
});
