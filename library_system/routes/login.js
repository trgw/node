const express = require('express');
const router = express.Router();

let settings = require('../settings');

let db = require('../db');



router.get('/', function(req, res, next) {
  res.render('login', {
    title: settings.title,
    login: settings.login,
    index: settings.index,
    books: settings.books,
    users: settings.users,
    history: settings.history,
    result: settings.result,
    libraryName: settings.libraryName,
  });
});

module.exports = router;
