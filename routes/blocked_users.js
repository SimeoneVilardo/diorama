var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var socketUsersHelper = require('../helpers/socket-users-helper.js');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Blocked Users API OK'
    };
    res.json(response);
});

router.get('/get-blocked-users', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'blockedUsers').then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/add-blocked-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    var override = req.body.override;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.addBlockedUser(req.user.id, contactId, override);
    }).then(function(blockedUser) {
        res.json(blockedUser);
    }).catch(function(err) {
        next(err);
    });
});

router.delete('/remove-blocked-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.removeBlockedUser(req.user.id, contactId);
    }).then(function(blockedUser) {
        res.json(blockedUser);
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;