var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var socketUsersHelper = require('../helpers/socket-users-helper.js');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Pending Users API OK'
    };
    res.json(response);
});

router.get('/get-pending-users', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'pendingUsers').then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/add-pending-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    var override = req.body.override;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.addPendingUser(req.user.id, contactId, override);
    }).then(function(pendingUser) {
        res.json(pendingUser);
    }).catch(function(err) {
        next(err);
    });
});

router.delete('/remove-pending-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.removePendingUser(req.user.id, contactId);
    }).then(function(pendingUser) {
        res.json(pendingUser);
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;