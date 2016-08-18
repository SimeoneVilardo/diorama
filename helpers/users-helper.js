var usersHelper = {};

var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var comunicationHelper = require('../helpers/comunication-helper.js');
var utilityHelper = require('../helpers/utility-helper.js');
var config = require('../config');

usersHelper.signup = function(comunication, username, password, mail, phone) {
    return dbHelper.createUser(comunication, username, password, mail, phone).then(function(user) {
        return [user, comunicationHelper.sendSignUp(comunication, username, password, mail, phone, comunication === config.comunication.mail ? user.validationToken.token : user.validationCode.code)];
    });
};

usersHelper.isBlocked = function(userId, blockedUsers) {
    // Se l'id passato è in formato stringa e non bson bisogna convertilo, altrimenti non disporrà del metodo equals
    userId = utilityHelper.canonizeId(userId);
    for (var i = 0; i < blockedUsers.length; i++) {
        if (userId.equals(blockedUsers[i].userId))
            return true;
    }
    return false;
};

usersHelper.getKnownUsersId = function(userId) {
    var ids = [userId];
    return dbHelper.getUserById(userId, 'pendingUsers contacts blockedUsers').then(function(user) {
        for (var i = 0; i < user.pendingUsers.length; i++) {
            ids.push(user.pendingUsers[i].userId);
        }
        for (var i = 0; i < user.contacts.length; i++) {
            ids.push(user.contacts[i].userId);
        }
        for (var i = 0; i < user.blockedUsers.length; i++) {
            ids.push(user.blockedUsers[i].userId);
        }
        return ids;
    });
};

usersHelper.getRecipientById = function(userId, recipientId) {
    // Esegue le due operazioni su database in modo parallelo
    // Cerca l'id del destinatario nella collezione users e nella collezione groups, e poi lo ritorna indicandone il tipo
    return bluebird.join(dbHelper.getUserById(recipientId, "_id username blockedUsers"), dbHelper.getGroupById(userId, recipientId), function(user, group) {
        if (user && !group) {
            return {
                type: "user",
                recipient: user
            };
        }
        else if (!user && group) {
            return {
                type: "group",
                recipient: group
            };
        }
    });
};

usersHelper.getConversationById = function(userId, contactId) {
    return usersHelper.getRecipientById(userId, contactId).then(function(recipient) {
        if (!recipient)
            throw errorHelper.resourceNotFoundException('Destinatario non trovato, impossibile caricare la conversazione');
        if (recipient.type === 'user')
            return dbHelper.getUserConversationById(userId, contactId);
        else
            return dbHelper.getGroupConversationById(userId, contactId);
    });
};

module.exports = usersHelper;