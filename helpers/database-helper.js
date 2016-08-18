// Il database-helper è un wrapper dei suoi stessi helper
// A causa dell'elevato numero di query necessarie, e del fatto che contenerle tutte in un unico file sarebbe stato scomodo
// esse sono state divise in tanti file. Per mantenere semplice la loro chiamate però, sono state wrappate dentro questo helper
var databaseHelper = {};

var dbAuthHelper = require('../helpers/database-helpers/database-authentication-helper.js');
var dbUsersHelper = require('../helpers/database-helpers/database-users-helper.js');
var dbGroupsHelper = require('../helpers/database-helpers/database-groups-helper.js');
var dbContactsHelper = require('../helpers/database-helpers/database-contacts-helper.js');
var dbMessagesHelper = require('../helpers/database-helpers/database-messages-helper.js');
var utilityHelper = require('../helpers/utility-helper.js');
var config = require('../config');

databaseHelper.createUser = function(comunication, username, password, mail, phone) {
    if(comunication === config.comunication.mail)
    {
        return dbAuthHelper.createUserWithMail(comunication, username, password, mail, phone);
    }
    else if(comunication === config.comunication.phone){
        return dbAuthHelper.createUserWithPhone(comunication, username, password, mail, phone);
    }
};

databaseHelper.validateByMail = function(token) {
    return dbUsersHelper.validateByMail(token);
};

databaseHelper.validateByPhone = function(code) {
    return dbUsersHelper.validateByPhone(code);
};

databaseHelper.getUserBasicInfoByUsername = function(username) {
    return dbUsersHelper.getUserBasicInfoByUsername(username);
};

databaseHelper.getUserBasicInfoById = function(userId) {
    userId = utilityHelper.canonizeId(userId);
    return dbUsersHelper.getUserBasicInfoById(userId);
};

databaseHelper.getUserByUsername = function(username, fields) {
    return dbUsersHelper.getUserByUsername(username, fields);
};

databaseHelper.getUserById = function(userId, fields) {
    userId = utilityHelper.canonizeId(userId);
    return dbUsersHelper.getUserById(userId, fields);
};

databaseHelper.getUserByMailOrUsername = function(login, fields) {
    return dbUsersHelper.getUserByMailOrUsername(login, fields);
};

databaseHelper.getUserByMailOrPhone = function(login, fields) {
    return dbUsersHelper.getUserByMailOrPhone(login, fields);
};

databaseHelper.getUserByMail = function(mail, fields) {
    return dbUsersHelper.getUserByMail(mail, fields);
};

databaseHelper.getGroupById = function(userId, groupId) {
    userId = utilityHelper.canonizeId(userId);
    groupId = utilityHelper.canonizeId(groupId);
    return dbGroupsHelper.getGroupById(userId, groupId);
};

databaseHelper.checkContactsToCreateGroup = function(userId, contactIds) {
    userId = utilityHelper.canonizeId(userId);
    for (var i = 0; i < contactIds.length; i++) {
        contactIds[i] = utilityHelper.canonizeId(contactIds[i]);
    }
    return dbGroupsHelper.checkContactsToCreateGroup(userId, contactIds);
};

databaseHelper.createGroup = function(userId, username, groupName, users) {
    userId = utilityHelper.canonizeId(userId);
    return dbGroupsHelper.createGroup(userId, username, groupName, users);
};

databaseHelper.removeGroupFromUser = function(userId, groupId) {
    userId = utilityHelper.canonizeId(userId);
    groupId = utilityHelper.canonizeId(groupId);
    return dbGroupsHelper.removeGroupFromUser(userId, groupId);
};

databaseHelper.removeUserFromGroup = function(userId, groupId) {
    userId = utilityHelper.canonizeId(userId);
    groupId = utilityHelper.canonizeId(groupId);
    return dbGroupsHelper.removeUserFromGroup(userId, groupId);
};

databaseHelper.addGroupToUser = function(userId, group) {
    userId = utilityHelper.canonizeId(userId);
    return dbGroupsHelper.addGroupToUser(userId, group);
};

databaseHelper.addUserToGroup = function(groupId, user) {
    groupId = utilityHelper.canonizeId(groupId);
    return dbGroupsHelper.addUserToGroup(groupId, user);
};

databaseHelper.getUserFromGroup = function(userId, groupId) {
    userId = utilityHelper.canonizeId(userId);
    groupId = utilityHelper.canonizeId(groupId);
    return dbGroupsHelper.getUserFromGroup(userId, groupId);
};

databaseHelper.getMessagesById = function(userId) {
    userId = utilityHelper.canonizeId(userId);
    return dbMessagesHelper.getMessagesById(userId);
};

databaseHelper.getMessageById = function(userId, msgId) {
    userId = utilityHelper.canonizeId(userId);
    msgId = utilityHelper.canonizeId(msgId);
    return dbMessagesHelper.getMessageById(userId, msgId);
};

databaseHelper.getAttachmentById = function(userId, attachId) {
    userId = utilityHelper.canonizeId(userId);
    attachId = utilityHelper.canonizeId(attachId);
    return dbMessagesHelper.getAttachmentById(userId, attachId);
};

databaseHelper.getUsersByUsername = function(username, ids, fields) {
    if (ids) {
        for (var i = 0; i < ids.length; i++) {
            ids[i] = utilityHelper.canonizeId(ids[i]);
        }
    }
    return dbUsersHelper.getUsersByUsername(username, ids, fields);
};

databaseHelper.getUserConversationById = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbMessagesHelper.getUserConversationById(userId, contactId);
};

databaseHelper.getGroupConversationById = function(userId, groupId) {
    userId = utilityHelper.canonizeId(userId);
    groupId = utilityHelper.canonizeId(groupId);
    return dbMessagesHelper.getGroupConversationById(userId, groupId);
};

databaseHelper.getContactById = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.getContactById(userId, contactId);
};

databaseHelper.getPendingUserById = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.getPendingUserById(userId, contactId);
};

databaseHelper.getBlockedUserById = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.getBlockedUserById(userId, contactId);
};

databaseHelper.addPendingUser = function(userId, pendingUser, override) {
    userId = utilityHelper.canonizeId(userId);
    return dbContactsHelper.addPendingUser(userId, pendingUser, override);
};

databaseHelper.addContact = function(userId, contact, override) {
    userId = utilityHelper.canonizeId(userId);
    return dbContactsHelper.addContact(userId, contact, override);
};

databaseHelper.addBlockedUser = function(userId, blockedUser, override) {
    userId = utilityHelper.canonizeId(userId);
    return dbContactsHelper.addBlockedUser(userId, blockedUser, override);
};

databaseHelper.removeContact = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.removeContact(userId, contactId);
};

databaseHelper.removePendingUser = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.removePendingUser(userId, contactId);
};

databaseHelper.removeBlockedUser = function(userId, contactId) {
    userId = utilityHelper.canonizeId(userId);
    contactId = utilityHelper.canonizeId(contactId);
    return dbContactsHelper.removeBlockedUser(userId, contactId);
};

databaseHelper.addMessageToUser = function(userId, message) {
    userId = utilityHelper.canonizeId(userId);
    return dbMessagesHelper.addMessageToUser(userId, message);
};

databaseHelper.revokeToken = function(token) {
    return dbAuthHelper.revokeToken(token);
};

databaseHelper.getToken = function(token) {
    return dbAuthHelper.getToken(token);
};

databaseHelper.setValidationToken = function(userId, token) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setValidationToken(userId, token);
};

databaseHelper.setValidationCode = function(userId, code) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setValidationCode(userId, code);
};

databaseHelper.setComunication = function(userId, comunication) {
    userId = utilityHelper.canonizeId(userId);
    return dbUsersHelper.setComunication(userId, comunication);
};

databaseHelper.setResetPasswordToken = function(userId, token) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setResetPasswordToken(userId, token);
};

databaseHelper.setResetPasswordCode = function(userId, code) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setResetPasswordCode(userId, code);
};

databaseHelper.setMail = function(userId, mail) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setMail(userId, mail);
};

databaseHelper.resetPassword = function(token, password) {
    return dbAuthHelper.resetPassword(token, password);
};

databaseHelper.setPassword = function(userId, password) {
    userId = utilityHelper.canonizeId(userId);
    return dbAuthHelper.setPassword(userId, password);
};

module.exports = databaseHelper;