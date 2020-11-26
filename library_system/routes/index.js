var express = require('express');
const app = require('../app');
var router = express.Router();

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
  console.log('req.body.input_login_name: ' + req.body.input_login_name);
  console.log('req.body.borrow_name' + req.body.borrow_name);
  //login_name = req.body.input_login_name;
  let borrow = req.body.borrow_name;
  //console.log(login_name);

  /* from login page */
  if (req.body.book_name === undefined) {

    console.log('/----- index page -----');
    console.log("第1の post に対する処理(login page からの処理)をしています");

    loginHasPassed = true;
    console.log('loginHasPassed: ' + loginHasPassed);
    loginName = req.body.input_login_name;
    console.log('loginName: ' + loginName);

    console.log('----- index page -----/');

    //console.log('addend0:', 0);

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
  } else if (req.body.book_name !== undefined) {

    console.log('/----- index page -----');
    console.log("第2の post に対する処理(books page の borrow button からの処理)をしています");

    const sql0 = "UPDATE books SET user_info = ? WHERE id = ?";
    const sql1 = "; UPDATE books SET info = 'borrowed' where id = ?";
    const sql2 = "; INSERT history VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)"; // history table の編集
    let bookId = parseInt(req.body.book_name);

    // sql2
    db.connection.query('SELECT * FROM history ORDER BY history_id DESC LIMIT 1', function(err, historyRow, fields) {
      if (err) {
        throw err;
      } else {
        //↓let historyId = db.hidtory.(last history_id)+1
        let historyId = historyRow.history_id + 1;
        console.log(historyId);
        // bookId
        ///let bookTitle = booksRow.title;
        ///let userId =
        let userName = loginName;
        let borrowDatetime = new Date();
        let formattedBorrowDatetime = borrowDatetime.toFormat("YYYY-MM-DD-HH24-MI-SS")
        console.log(formattedBorrowDatetime);
        let returnDatetime = NULL;
        let deadline = NULL;
        let info = 'borrowed';
      }
    });
    db.connection.query('SELECT * FROM books WHERE id = ?', [bookId], function(err, booksRow, fields) {
      if (err) {
        throw err;
      } else {
        //let historyId = db.hidtory.(last history_id)+1
        // bookId
        let bookTitle = booksRow.title;
        //let userId =
        let userName = loginName;
        let borrowDatetime = new Date();
        let formattedBorrowDatetime = borrowDatetime.toFormat("YYYY-MM-DD-HH24-MI-SS")
        console.log(formattedBorrowDatetime);
        let returnDatetime = NULL;
        let deadline = NULL;
        let info = 'borrowed';
      }
    });
    db.connection.query('SELECT * FROM books WHERE id = ?', [bookId], function(err, r_usersRow, fields) {
      if (err) {
        throw err;
      } else {
        //let historyId = db.hidtory.(last history_id)+1
        // bookId
        let bookTitle = booksRow.title;
        //let userId =
        let userName = loginName;
        let borrowDatetime = new Date();
        let formattedBorrowDatetime = borrowDatetime.toFormat("YYYY-MM-DD-HH24-MI-SS")
        console.log(formattedBorrowDatetime);
        let returnDatetime = NULL;
        let deadline = NULL;
        let info = 'borrowed';
      }
    });

    console.log(req.body.book_name);
    console.log(bookId);
    console.log('loginName: ' + loginName);
    //console.log(sql, [login_name, book_id]);
    console.log('----- index page -----/');

    //db.connection.query(sql, [login_name, book_id], function (err, rows, fields) {
    // long. fix me
    db.connection.query(sql0 + sql1 + sql2, [/* sql0 */loginName, bookId, /* sql1 */bookId, /* sql2*/historyId, bookId, bookTitle, userId, userName, formattedBorrowDatetime, returnDatetime, deadline, info], function (err, rows, fields) {
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
