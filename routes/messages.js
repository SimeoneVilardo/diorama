var express = require('express');
var router = express.Router();
var path = require('path');
var bluebird = require('bluebird');
var errorHelper = require('../helpers/error-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var usersHelper = require('../helpers/users-helper.js');
var config = require('../config.js');

router.get('/', function(req, res, next) {
    var response = {
        message: 'Diorama Messages API OK'
    };
    res.json(response);
});

router.get('/get-messages', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getMessagesById(req.user.id).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-conversation', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return usersHelper.getConversationById(req.user.id, contactId);
    }).then(function(messages) {
        var response = {
            messages: messages
        };
        res.json(response);
    }).catch(function(err) {
        next(err);
    });
});

//TODO Documentation
router.get('/get-message-by-id', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var msgId = req.query.msgId;
    bluebird.try(function() {
        if (!msgId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getMessageById(req.user.id, msgId);
    }).then(function(message) {
        if(!message)
            throw errorHelper.resourceNotFoundException();
        res.json(message);
    }).catch(function(err) {
        next(err);
    });
});

//TODO Documentation
router.get('/download-attachment', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    var attachId = req.query.attachId;
    bluebird.try(function() {
        if (!attachId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getAttachmentById(req.user.id, attachId);
    }).then(function(attachment) {
        if(!attachment)
            throw errorHelper.resourceNotFoundException();
        var attchPath = path.join(__dirname, '../', config.path.attachments, attachment.fileName);
        res.download(attchPath, attachment.originalFileName);
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;