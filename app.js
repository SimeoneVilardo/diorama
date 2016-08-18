var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var securityHelper = require('./helpers/security-helper.js');
var mailHelper = require('./helpers/mail-helper.js');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongodb.connection_string);

var index = require('./routes/index');
var auth = require('./routes/authentication');
var users = require('./routes/users');
var contacts = require('./routes/contacts');
var pendingusers = require('./routes/pending_users');
var blockedusers = require('./routes/blocked_users');
var groups = require('./routes/groups');
var uploads = require('./routes/uploads');
var messages = require('./routes/messages');
var web = require('./routes/web');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// Loggettino tanto carino, perchè genera un file per giorno. Utile per vedere cosa succede nel sito e verificare che il Titze faccia qualcosa
var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'DD_MM_YYYY',
  filename: logDirectory + '/diorama_%DATE%.log',
  frequency: 'daily',
  verbose: false
});
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'docs/generated')));
app.use(securityHelper.jwtAuthentication());

mailHelper.init();

app.use('/', index);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/pendingusers', pendingusers);
app.use('/api/blockedusers', blockedusers);
app.use('/api/groups', groups);
app.use('/api/uploads', uploads);
app.use('/api/messages', messages);
app.use('/api/web', web);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(/^\/api/, function(err, req, res, next) {
  if (!err.status)
    err.status = 500;
  res.status(err.status);
  var response = {
    message: err.message,
    statusCode: err.status
  };
  res.json(response);
});

app.use('/', function(err, req, res, next) {
  if (!err.status)
    err.status = 500;
  res.status(err.status);
  res.render('error', {
    title: 'Errore',
    user: req.user,
    error: err
  });
});

module.exports = app;