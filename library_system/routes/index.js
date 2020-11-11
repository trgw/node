var express = require('express');
const app = require('../app');
var router = express.Router();

let settings = require('../settings');

let db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: settings.title,
    login: settings.login,
    index: settings.index,
    books: settings.books,
    users: settings.users,
    history: settings.history,
    result: settings.result,
    libraryName: settings.libraryName
  });
});

router.post('/', function(req, res, next) {
  // /login から来た場合
  if /* from login */ {

  }
  // /books から来た場合
  const borrow = req.body.borrow_name;
  db.connection.query('UPDATE books set user_info = ?', [borrow_id], function (err, rows, fields) { // ?:本来、ログインしているユーザの名前
    if (err) {
      throw err;
    } else {
      res.render('index', {
        title: settings.title,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        result: settings.result,
        libraryName: settings.libraryName
      });
    }
  })

});

module.exports = router;
