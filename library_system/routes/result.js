const express = require('express');
const router = express.Router();

let settings = require('../settings');

let db = require('../db');


// get で一応のページ
// router.get('/', function(req, res, next) {
//   res.render('result', {
//     title: settings.title,
//     index: settings.index,
//     all: settings.all,
//     result: settings.result,
//     libraryName: settings.libraryName
//   });
// });

router.post('/', function(req, res, next) {
  const search_string = req.body.search_name;
  db.connection.query('SELECT * FROM books WHERE title = ?', [search_string], function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.render('result', {
        title: settings.title,
        index: settings.index,
        books: settings.books,
        users: settings.users,
        libraryName: settings.libraryName,
        content: rows
      });
    }
  });
});


module.exports = router;
