var express = require('express');
const app = require('../app');
var router = express.Router();

let settings = require('../settings');

let db = require('../db');

let login_name = null;

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
  console.log(req.body.input_login_name);
  console.log(req.body.borrow_name);
  let login_name = req.body.input_login_name;
  let borrow = req.body.borrow_name;
  //console.log(login_name);
  if (/* from login page */ borrow === undefined) {
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
  } else if (/* from books page */ borrow !== undefined ) {
    db.connection.query('UPDATE books set user_info = ?', [borrow_id], function (err, rows, fields) { // ?:本来、ログインしているユーザの名前
      if (err) {
        throw err;
      } else {
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
      }
    });
  } else {
    console.log('please login');
    res.render('login', {
      title: settings.title,
      login: settings.login,
      index: settings.index,
      books: settings.books,
      users: settings.users,
      history: settings.history,
      result: settings.result,
      libraryName: settings.libraryName
    });
  }
  console.log(login_name);
  console.log(borrow);
});


/*
// login page から来る時
router.post('/', function(req, res, next) {
  console.log(login_name);
  let login_name = req.body.input_login_name;
  console.log(login_name);
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


// books page から来る時
router.post('/', function(req, res, next) {
  const borrow = req.body.borrow_name;
  db.connection.query('UPDATE books set user_info = ?', [borrow_id], function (err, rows, fields) { // ?:本来、ログインしているユーザの名前
    if (err) {
      throw err;
    } else {
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
    }
  })
});
*/

module.exports = router;
