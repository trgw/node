const express = require('express');
const router = express.Router();

let settings = require('../settings');
let db = require('../db');
let login = require('./login');

console.log('books page is here');

router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM books;', function (err, rows, fields) {
    if (err) {
      throw err;
    } else {

      console.log('/----- books page -----');
      console.log('login.HasPassed: ' + login.HasPassed);
      console.log('login.Name: ' + login.Name);
      console.log('----- books page -----');

      res.render('books', {
        title: settings.title,
        login: settings.login,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        history: settings.history,
        result: settings.result,
        libraryName: settings.libraryName,
        content: rows
      });
    }
  });
});

module.exports = router;
