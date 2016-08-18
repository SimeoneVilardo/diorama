var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var groupsHelper = require('../helpers/groups-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var socketUsersHelper = require('../helpers/socket-users-helper.js');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Groups API OK'
    };
    res.json(response);
});

router.post('/create-group', function(req, res, next) {
    var groupName = req.body.groupName;
    var contacts = req.body.contacts;
    bluebird.try(function() {
        if (!groupName || !contacts)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return socketUsersHelper.createGroup(req.user.id, req.user.username, groupName, contacts);
    }).then(function(group) {
        res.json(group);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-groups', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'groups').then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/add-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeGroupAdmin, function(req, res, next) {
    var groupId = req.body.groupId;
    var user = req.body.user;
    bluebird.try(function() {
        if (!groupId || !user)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getGroupById(req.user.id, groupId);
    }).then(function(dbGroup) {
        var group = {
            groupId: dbGroup._id,
            groupName: dbGroup.groupName,
            admin: user.admin
        };
        return groupsHelper.addUser(groupId, user.userId, group, user).return(user);
    }).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

router.delete('/remove-user', securityHelper.mustBeAuthenticated, securityHelper.mustBeGroupAdmin, function(req, res, next) {
    var userId = req.body.userId;
    var groupId = req.body.groupId;
    bluebird.try(function() {
        if (!userId || !groupId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserFromGroup(req.user.id, groupId);
    }).then(function(user) {
        return groupsHelper.removeUser(groupId, userId).return(user);
    }).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;