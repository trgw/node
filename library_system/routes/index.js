var express = require('express');
const app = require('../app');
var router = express.Router();

let login = require('./login');
let settings = require('../settings');

let db = require('../db');

console.log('index page is here');

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
  console.log('[this is index.js] login.HasPassed: ' + login.HasPassed);

  /* from login page */
  if (login.HasPassed === false) {
    console.log('/----- index page -----');
    console.log("第1の post に対する処理(login page からの処理)をしています");
    login.HasPassed = true;
    console.log('login.HasPassed: ' + login.HasPassed);
    login.Name = req.body.input_login_name;
    console.log('login.Name: ' + login.Name);
    console.log('----- index page -----/');

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
  } else {

    console.log('/----- index page -----');
    console.log("第2の post に対する処理(books page の borrow button からの処理)をしています");

    const sql0 = "UPDATE books SET user_info = ? WHERE id = ?";
    const sql1 = "; UPDATE books SET info = 'borrowed' WHERE id = ?";
    const sql2 = "; INSERT INTO history (history_id, book_id, book_title, user_id, user_name, borrow_datetime, info) VALUES (?, ?, ?, ?, ?, ?, ?)"; // history table の編集

    let historyId;
    let bookId = parseInt(req.body.book_name);
    let bookTitle;
    let userId;
    let userName = login.Name;

    const momentTimezone = require('moment-timezone');
    /*
    let utcBorrowDatetime = new Date();
    console.log('utcBorrowDatetime: ' + utcBorrowDatetime);
    let formattedUtcBorrowDatetime = utcBorrowDatetime.toFormat("YYYY-MM-DD-HH24-MI-SS")
    console.log('formattedUtcBorrowDatetime: ' + formattedUtcBorrowDatetime);
    */
    /*
    let jstBorrowDatetime = momentTimezone(utcBorrowDatetime).tz('Asia/Tokyo');
    console.log('jstBorrowDatetime: ' + jstBorrowDatetime);
    let formattedJstBorrowDatetime = jstBorrowDatetime.toFormat("YYYY-MM-DD-HH24-MI-SS")
    console.log('formattedJstBorrowDatetime: ' + formattedJstBorrowDatetime);
    */
    let utcBorrowDatetime = momentTimezone.tz(new Date(), 'UTC');
    console.log('utcBorrowDatetime: ' + utcBorrowDatetime);
    let formattedJstBorrowDatetime = momentTimezone(utcBorrowDatetime).tz('Asia/Tokyo').format('YYYY-MM-DD HH-mm-ss');
    console.log('formattedJstBorrowDatetime: ' + formattedJstBorrowDatetime);

    let info = 'borrowed';
    // sql2
    db.connection.query('SELECT * FROM history ORDER BY history_id DESC LIMIT 1', function(err, historyRow, fields) {
      console.log('sql2');
      if (err) {
        throw err;
      } else {
        console.log('sql2 not error');
        //↓let historyId = db.hidtory.(last history_id)+1
        historyId = historyRow[0].history_id + 1;
        console.log('historyId: ' + historyId);
      }
    });
    db.connection.query('SELECT * FROM books WHERE id = ?', [bookId], function(err, booksRow, fields) {
      if (err) {
        throw err;
      } else {
        bookTitle = booksRow[0].title;
        console.log('bookTitle: ' + bookTitle);
      }
    });
    db.connection.query('SELECT * FROM r_users WHERE name = ?', [login.Name], function(err, r_usersRow, fields) {
      if (err) {
        throw err;
      } else {
        userId = r_usersRow[0].id;
        console.log('userId: ' + userId);
      }
    });

    console.log('↓ mysql columns:');
    console.log('historyId: ' + historyId);
    console.log('bookId: ' + bookId);
    console.log('bookTitle: ' + bookTitle);
    console.log('userId: ' + userId);
    console.log('userName: ' + userName);
    console.log('formattedJstBorrowDatetime: ' + formattedJstBorrowDatetime);
    console.log('info: ' + info);
    console.log('----- index page -----/');

    //db.connection.query(sql, [login_name, book_id], function (err, rows, fields) {
    // long. fix me
    db.connection.query(sql0 + sql1 + sql2, [/* sql0 */login.Name, bookId, /* sql1 */bookId, /* sql2*/historyId, bookId, bookTitle, userId, userName, formattedJstBorrowDatetime, info], function (err, rows, fields) {
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
