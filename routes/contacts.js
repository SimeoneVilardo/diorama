var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var socketUsersHelper = require('../helpers/socket-users-helper.js');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Contacts API OK'
    };
    res.json(response);
});

router.get('/get-contacts', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'contacts').then(function(user) {
        res.json(user.contacts);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/add-contact', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    var override = req.body.override;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        // Lo devo overriddare perchè se si sta accettando un utente che si trova in pendingUsers la query deve superarlo    
        return socketUsersHelper.addContact(req.user.id, contactId, override);
    }).then(function(contact) {
        res.json(contact);
    }).catch(function(err) {
        next(err);
    });
});

router.delete('/remove-contact', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.body.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.removeContact(req.user.id, contactId);
    }).then(function(contact) {
        res.json(contact);
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;