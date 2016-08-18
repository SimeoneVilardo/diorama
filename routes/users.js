var express = require('express');
var router = express.Router();
var bluebird = require("bluebird");
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var usersHelper = require('../helpers/users-helper.js');
var config = require('../config');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Users API OK'
    };
    res.json(response);
});

router.get('/get-user-by-username', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var username = req.query.username;
    var fields = req.query.fields;
    bluebird.try(function() {
        if (!username)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserByUsername(username, fields);
    }).then(function(user) {
        if (!user)
            throw errorHelper.resourceNotFoundException();
        var response = {
            user: user
        };
        res.json(response);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-user-by-id', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var userId = req.query.userId;
    var fields = req.query.fields;
    bluebird.try(function() {
        if (!userId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserById(userId, fields);
    }).then(function(user) {
        if (!user)
            throw errorHelper.resourceNotFoundException();
        var response = {
            user: user
        };
        res.json(response);
    }).catch(function(err) {
        if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
            return next(errorHelper.badRequestException());
        next(err);
    });
});

router.get('/get-users-by-username', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var username = req.query.username;
    bluebird.try(function() {
        if (!username)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUsersByUsername(username);
    }).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-unknown-users-by-username', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var username = req.query.username;
    bluebird.try(function() {
        if (!username)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return usersHelper.getKnownUsersId(req.user.id);
    }).then(function(ids) {
        throw dbHelper.getUsersByUsername(username, ids, 'username');
    }).then(function(users) {
        var response = {
            users: users
        };
        res.json(response);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-users-and-contacts-and-groups', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'contacts pendingUsers blockedUsers groups').then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/set-comunication', securityHelper.mustBeAuthenticated, function(req, res, next) {
    if (!req.user.mail || req.user.mail === '') {
        var mailMissingResponse = {
            status: 'mail_missing'
        };
        res.json(mailMissingResponse);
        return;
    }
    var comunication = req.body.comunication;
    bluebird.try(function() {
        if (!comunication)
            throw errorHelper.badRequestException();
        return dbHelper.setComunication(req.user.id, comunication);
    }).then(function(affectedRows) {
        var tokenUser = req.user;
        tokenUser._id = tokenUser.id;
        delete tokenUser.id;
        tokenUser.comunication = comunication;
        var ip = securityHelper.getClientIP(req);
        var token = securityHelper.issueToken(tokenUser, ip);
        var response = {
            affectedRows: affectedRows,
            token: token
        };
        res.cookie(config.security.auth_cookie, token);
        res.json(response);
    }).catch(function(err) {
        next(err);
    });

});


module.exports = router;