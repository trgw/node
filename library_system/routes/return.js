const express = require('express');
const router = express.Router();

let settings = require('../settings');

console.log('return page is here');

router.get('/', function(req, res, next) {
  res.render('return', {
    title: settings.title,
    login: settings.login,
    index: settings.index,
    books: settings.books,
    users: settings.users,
    history: settings.history,
    result: settings.result,
    return: settings.return,
    libraryName: settings.libraryName
  });
});

module.exports = router;
