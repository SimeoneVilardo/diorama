var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var usersHelper = require('../helpers/users-helper.js');
var groupsHelper = require('../helpers/groups-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var config = require('../config.js');

router.get('/', function(req, res, next) {
    var response = {
        message: 'Diorama Web API OK'
    };
    res.json(response);
});

router.get('/get-unknown-users-by-username', function(req, res, next) {
    var username = req.query.username;
    bluebird.try(function() {
        if (!username)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return usersHelper.getKnownUsersId(req.user.id);
    }).then(function(ids) {
        return dbHelper.getUsersByUsername(username, ids, 'username');
    }).then(function(users) {
        res.render('partials/unknown_users', {
            users: users
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-conversation', function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return usersHelper.getConversationById(req.user.id, contactId);
    }).then(function(messages) {
        res.render('partials/messages', {
            picture_path: config.path.users_pictures,
            attachment_path: config.path.attachments,
            messages: messages,
            myId: req.user.id
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-message-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var msgId = req.query.msgId;
    bluebird.try(function() {
        if (!msgId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getMessageById(req.user.id, msgId);
    }).then(function(message) {
        if(!message)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/messages', {
            picture_path: config.path.users_pictures,
            attachment_path: config.path.attachments,
            messages: [message],
            myId: req.user.id
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-contact-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getContactById(req.user.id, contactId);
    }).then(function(contact) {
        if(!contact)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/contact', {
            picture_path: config.path.users_pictures,
            contact: contact
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-group-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var groupId = req.query.groupId;
    bluebird.try(function() {
        if (!groupId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getGroupById(req.user.id, groupId);
    }).then(function(group) {
        res.render('partials/group', {
            picture_path: config.path.users_pictures,
            group: group
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-create-group-modal', securityHelper.mustBeAuthenticated, function(req, res, next) {
    dbHelper.getUserById(req.user.id, 'contacts').then(function(user) {
        res.render('partials/create_group_modal', {
            picture_path: config.path.users_pictures,
            contacts: user.contacts
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-edit-group-modal', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var groupId = req.query.groupId;
    bluebird.try(function() {
        if (!groupId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getGroupById(req.user.id, groupId);
    }).then(function(group) {
        return [group, dbHelper.getUserById(req.user.id, 'contacts')];
    }).spread(function(group, user) {
        var view_users = groupsHelper.getEditGroupUsers(req.user.id, group.users, user.contacts);
        res.render('partials/edit_group_modal', {
            picture_path: config.path.users_pictures,
            groupName: group.groupName,
            groupId: group._id,
            users: view_users
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-info-group-modal', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var groupId = req.query.groupId;
    bluebird.try(function() {
        if (!groupId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getGroupById(req.user.id, groupId, 'users');
    }).then(function(group) {
        res.render('partials/info_group_modal', {
            picture_path: config.path.users_pictures,
            groupName: group.groupName,
            users: group.users
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-upload-attachments-modal', securityHelper.mustBeAuthenticated, function(req, res, next) {
    res.render('partials/upload_attachments_modal');
});

router.get('/get-pending-user-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getPendingUserById(req.user.id, contactId);
    }).then(function(pendingUser) {
        if(!pendingUser)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/pending_user', {
            pendingUser: pendingUser
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-blocked-user-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getBlockedUserById(req.user.id, contactId);
    }).then(function(blockedUser) {
        if(!blockedUser)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/blocked_user', {
            blockedUser: blockedUser
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-contact-management-row-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getContactById(req.user.id, contactId);
    }).then(function(contact) {
        res.render('partials/contact_row', {
            picture_path: config.path.users_pictures,
            contact: contact
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-pending-user-management-row-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getPendingUserById(req.user.id, contactId);
    }).then(function(pendingUser) {
        if(!pendingUser)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/pending_user_row', {
            pendingUser: pendingUser
        });
    }).catch(function(err) {
        next(err);
    });
});

router.get('/get-blocked-user-management-row-by-id', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var contactId = req.query.contactId;
    bluebird.try(function() {
        if (!contactId)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getBlockedUserById(req.user.id, contactId);
    }).then(function(blockedUser) {
        if(!blockedUser)
            throw errorHelper.resourceNotFoundException();
        res.render('partials/blocked_user_row', {
            blockedUser: blockedUser
        });
    }).catch(function(err) {
        next(err);
    });
});

router.post('/get-attachments-rows', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var files = req.body.files;
    res.render('partials/attachments_rows', {
        files: files
    });
});

module.exports = router;