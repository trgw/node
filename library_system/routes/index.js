var express = require('express');
const app = require('../app');
var router = express.Router();

let settings = require('../settings');

let db = require('../db');

/* books page で back to the top page の link から, result page Topへ戻る */
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

  /* from login page */
  if (req.body.book_name === undefined) {

    console.log("第1の post に対する処理(login page からの処理)をしています");

    exports.login_name = req.body.login_name;

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

    /* from books page (borrow button)*/
  } else if (req.body.book_name !== undefined ) {

    console.log("第2の post に対する処理(books page の borrow button からの処理)をしています");

    let book_id = Number(req.body.book_name);

    db.connection.query('UPDATE books SET user_info = ?　where id = ?; UPDATE books SET info = "borrowed"', [this.login_name, book_id], function (err, rows, fields) { // ?:本来、ログインしているユーザの名前
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
