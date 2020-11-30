const express = require('express');
const router = express.Router();

let appjs = require('../app');
let settings = require('../settings');

let db = require('../db');

console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
let loginHasPassed = new Boolean(false);
console.log('loginHasPassed: ' + loginHasPassed);
console.log('this.loginHasPassed: ' + this.loginHasPassed);
let loginName;
console.log('loginName: ' + loginName);
console.log('this.loginName: ' + this.loginName);
console.log('-*-*-*- login page is here -*-*-*-');

router.get('/', function(req, res, next) {

  console.log('/----- login page -----')
  console.log('loginHasPassed: ' + loginHasPassed);
  console.log('this.loginHasPassed: ' + this.loginHasPassed);
  console.log('loginName: ' + loginName);
  console.log('this.loginName: ' + this.loginName);
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

/* module.exports = router; が後
module.exports.HasPassed = loginHasPassed;
console.log(module.exports);
module.exports.Name = loginName;
console.log(module.exports);
module.exports = router;
console.log(module.exports);
*/

/*
module.exports = router;
console.log(module.exports);
console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
module.exports.HasPassed = loginHasPassed;
console.log(module.exports);
console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
module.exports.Name = loginName;
console.log(module.exports);
*/

module.exports = router;
module.exports.HasPassed = loginHasPassed;
module.exports.Name = loginName;
console.log(module.exports);
console.log('-*-*- bye (login page -*-*-');
