const express = require('express');
const router = express.Router();

let settings = require('../settings');
let db = require('../db');

let userId;

console.log('return page is here');

router.post('/', function(req, res, next) {

  console.log('req.body.book_name: ' + req.body.book_name);
  // from index page
  if (req.body.book_name == undefined) {
    userId = req.body.user_name;
    db.connection.query('SELECT * FROM books WHERE user_id = ?', [userId], function(err, rows, fields) {
      res.render('return', {
        title: settings.title,
        login: settings.login,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        history: settings.history,
        result: settings.result,
        returnn: settings.returnn,
        libraryName: settings.libraryName,
        content: rows
      });
    })
    // return button pushed
  } else {
    let bookId = req.body.book_name;
    const momentTimezone = require('moment-timezone');
    let utcReturnDatetime = momentTimezone.tz(new Date(), 'UTC');
    console.log('utcReturnDatetime: ' + utcReturnDatetime);
    let formattedJstReturnDatetime = momentTimezone(utcReturnDatetime).tz('Asia/Tokyo').format('YYYY-MM-DD HH-mm-ss');
    console.log('formattedJstReturnDatetime: ' + formattedJstReturnDatetime);

    let sql0 = 'UPDATE books SET info = "returned", user_id = NULL, user_name = NULL WHERE id = ?';
    let sql1 = '; UPDATE history SET return_datetime = ?, info = "returned" WHERE book_id = ?';
    db.connection.query(sql0 + sql1, [bookId, formattedJstReturnDatetime, bookId], function(err, rows, fields) {
      console.log('userId: ' + userId);
      db.connection.query('SELECT * FROM books WHERE user_id = ?', [userId], function(err, rows, fields) {
        res.render('return', {
          title: settings.title,
          login: settings.login,
          index: settings.index,
          books: settings.books,
          users: settings.users,
          history: settings.history,
          result: settings.result,
          returnn: settings.returnn,
          libraryName: settings.libraryName,
          content: rows
        });
      })
    })
  }
});

module.exports = router;
