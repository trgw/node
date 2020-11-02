const express = require('express');
const router = express.Router();

let settings = require('../settings');

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  database: "library",
  password: "ubiq2005tech_5_virtual_Root"
});

// const connection = mysql.createConnection({
//   host: '192.168.1.182',
//   user: "root",
//   database: "library",
//   password: "ubiq2005tech_5_virtual_Root"
// });

connection.connect();

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM books;', function (err, rows, fields) {
    if (err) throw err;

    res.render('all', {
      title: settings.title,
      top: settings.top,
      all: settings.all,
      libraryName: settings.libraryName,
      content: rows
    });

  });
});

//connection.end();

// router.get('/', function(req, res, next) {
//   res.render('all', {
//     title: settings.title,
//     top: settings.top,
//     all: settings.all,
//     libraryName: settings.libraryName
//   })
// })

// connection.connect((err) => {
//   if (err) {
//     console.log('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('success');
// });

module.exports = router;
