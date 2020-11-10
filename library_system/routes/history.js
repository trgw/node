const express = require('express');
const router = express.Router();

let settings = require('../settings');

let db = require('../db');



router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM history;', function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('hsitory', {
        title: settings.title,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        history: settings.history,
        libraryName: settings.libraryName,
        content: rows
      });
    }
  });
});

module.exports = router;
