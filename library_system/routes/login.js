const express = require('express');
const router = express.Router();

let appjs = require('../app');
let settings = require('../settings');

let db = require('../db');

//exports.loginHasPassed = new Boolean(true);

console.log('login page is here');

router.get('/', function(req, res, next) {

  console.log('/----- login page -----')
  let HasPassed = new Boolean(false);
  console.log('this.HasPassed: ' + this.HasPassed);
  module.exports.Name;
  console.log('login.Name: ' + this.Name);
  console.log('----- login page -----/')

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
