var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var path = require('path');
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var socketHelper = require('../helpers/socket-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var config = require('../config.js');

router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Home',
    user: req.user,
    validationCompleted: req.query.validationCompleted
  });
});


router.get('/validate-phone', function(req, res, next) {
  res.render('validate_phone', {
    title: 'Convalida',
    user: req.user
  });
});

router.get('/request-recover-username', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
  res.render('request_recover_username', {
    title: 'Recupero username',
    user: req.user
  });
});

router.get('/request-reset-password', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
  res.render('request_reset_password', {
    title: 'Richiedi reset password',
    user: req.user
  });
});

router.get('/reset-password', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
  var resetPasswordToken = req.query.resetPasswordToken;
  if (!resetPasswordToken)
    return next(errorHelper.badRequestException());
  res.render('reset_password', {
    title: 'Reset password',
    user: req.user,
    resetPasswordToken: resetPasswordToken
  });
});

router.get('/login', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
  res.render('login', {
    title: 'Login',
    user: req.user
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'Informazioni',
    user: req.user
  });
});

router.get('/signup', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
  res.render('signup', {
    title: 'Registrazione',
    user: req.user
  });
});

router.get('/chat', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
  dbHelper.getUserById(req.user.id, 'username contacts pendingUsers blockedUsers groups').then(function(user) {
    for (var i = 0; i < user.contacts.length; i++) {
      user.contacts[i].online = socketHelper.isOnline(user.contacts[i].userId);
    }
    res.render('chat', {
      title: 'Chat',
      picture_path: config.path.users_pictures,
      user: user
    });
  }).catch(function(err) {
    next(err);
  });
});

router.get('/validate-mail', function(req, res, next) {
  var token = req.query.token;
  bluebird.try(function() {
    if (!token)
      throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
    return dbHelper.validateByMail(token);
  }).then(function(user) {
    if (!user.validated)
      throw next(errorHelper.badRequestException('Il codice di validazione fornito non è valido'));
    var ip = securityHelper.getClientIP(req);
    var token = securityHelper.issueToken({
      _id: user._id,
      username: user.username,
      validated: user.validated,
      comunication: user.comunication,
      mail: user.mail,
      phone: user.phone
    }, ip);
    res.cookie(config.security.auth_cookie, token);
    res.redirect('/?validationCompleted=true');
  }).catch(function(err) {
    next(err);
  });
});


router.get('/management', securityHelper.mustBeAuthenticated, function(req, res, next) {
  dbHelper.getUserById(req.user.id, 'contacts pendingUsers blockedUsers groups').then(function(user) {
    res.render('management', {
      user: req.user,
      title: req.user.username,
      picture_path: config.path.users_pictures,
      contacts: user.contacts,
      pendingUsers: user.pendingUsers,
      blockedUsers: user.blockedUsers,
      groups: user.groups
    });
  }).catch(function(err) {
    next(err);
  });
});

router.get('/documentation', function(req, res, next) {
  res.sendFile('documentation.html', {
    root: path.join(__dirname, '../', config.path.api_doc)
  });
});

module.exports = router;