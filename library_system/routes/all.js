const express = require('express');
const router = express.Router();

let settings = require('../settings');

let db = require('../db');



router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM books;', function (err, rows, fields) {
    if (err) throw err;

    res.render('all', {
      title: settings.title,
      index: settings.index,
      all: settings.all,
      libraryName: settings.libraryName,
      content: rows
    });

  });
});

module.exports = router;
