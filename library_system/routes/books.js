const express = require('express');
const router = express.Router();

let settings = require('../settings');
let index = require('./index');

let db = require('../db');



router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM books;', function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('books', {
        title: settings.title,
        login: settings.login,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        history: settings.history,
        result: settings.result,
        libraryName: settings.libraryName,
        login_name: index.login_name,
        content: rows
      });
    }
  });
});

module.exports = router;
