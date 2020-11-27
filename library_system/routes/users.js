var express = require('express');
var router = express.Router();

let settings = require('../settings');

let db = require('../db');

console.log('users page is here');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.connection.query('SELECT * FROM r_users;', function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('users', {
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
