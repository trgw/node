const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const historyRouter = require('./routes/history');
const resultRouter = require('./routes/result');

let settings = require('./settings');
let db = require('./db');

let mysql = require("mysql2");

let login_name = null;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use: middleware を読み込んでいる. 先に書いたものが優先される.
app.use(logger('dev')); // command line に log 表示.

// post 来た時等
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // url-encoded

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/history', historyRouter);
app.use('/result', resultRouter);
//app.use('/db', dbRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connection.connect();

app.listen(settings.server_port, settings.server_host)

module.exports = app;
