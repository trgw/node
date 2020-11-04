var express = require('express');
const app = require('../app');
var router = express.Router();

let settings = require('../settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: settings.title,
    index: settings.index,
    all: settings.all,
    result: settings.result,
    libraryName: settings.libraryName
  });
});

module.exports = router;
