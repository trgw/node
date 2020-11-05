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

// 検索ボタンを押したら打ち込んだら get で文字列と完全一致する要素（title, author, genre）をすべて表示
router.get('/', function(req, res, next) {
  const search_string = req.body.search_string;
  db.connection.query(
    ('SELECT * FROM books WHERE `title` = "Mossad" OR `author` = "Mossad" OR `genre` = "Mossad" OR `publisher` = "Mossad";'
    ), function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        res.render('result', {
          title: settings.title,
          index: settings.index,
          all: settings.all,
          libraryName: settings.libraryName,
          content: rows
        });
      }
  });
});


// postで
// router.post('/', function(req, res, next) {
//   const search_string = req.body.search_string;
//   db.connection.query(
//     ('SELECT * FROM books WHERE `title` = "Mossad" OR `author` = "Mossad" OR `genre` = "Mossad" OR `publisher` = "Mossad";',
//     search_string, search_string, search_string, search_string
//     ), function (err, rows, fields) {
//       if (err) {
//         throw err;
//       } else {
//         res.render('result', {
//           title: settings.title,
//           index: settings.index,
//           all: settings.all,
//           libraryName: settings.libraryName,
//           content: rows
//         });
//       }
//   });
// });

module.exports = router;
