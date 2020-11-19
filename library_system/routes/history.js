const express = require('express');
const router = express.Router();

let settings = require('../settings');

let db = require('../db');

console.log('history page is here');

router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM history;', function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('history', {
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

/* book のデータから */
router.post('/', function(req, res, next) {

  let book_id = parseInt(req.body.book_name);

  db.connection.query('SELECT * FROM history WHERE book_id = ?', [book_id], function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('history', {
        title: settings.title,
        login: settings.login,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        history: settings.history,
        result: settings.result,
        libraryName: settings.libraryName,
        content: rows
      })
    }
  })
})

module.exports = router;
