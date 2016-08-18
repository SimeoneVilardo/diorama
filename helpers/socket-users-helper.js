var socketUsersHelper = {};

var moment = require('moment');
var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var socketHelper = require('../helpers/socket-helper.js');
var usersHelper = require('../helpers/users-helper.js');
var groupsHelper = require('../helpers/groups-helper.js');
var errorHelper = require('../helpers/error-helper.js');

socketUsersHelper.addContact = function(userId, contactId, override) {
    return dbHelper.getUserById(contactId, 'username').then(function(user) {
        var contact = {
            userId: user._id,
            username: user.username,
            creationDate: moment()
        };
        return [contact, dbHelper.addContact(userId, contact, override)];
    }).spread(function(contact, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, contact, 'new_contact');
        return contact;
    });
};

socketUsersHelper.addBlockedUser = function(userId, contactId, override) {
    return dbHelper.getUserById(contactId, 'username').then(function(user) {
        var blockedUser = {
            userId: user._id,
            username: user.username,
            creationDate: moment()
        };
        return [blockedUser, dbHelper.addBlockedUser(userId, blockedUser, override)];
    }).spread(function(blockedUser, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, blockedUser, 'new_blocked_user');
        return blockedUser;
    });
};

socketUsersHelper.addPendingUser = function(userId, contactId, override) {
    return dbHelper.getUserById(contactId, 'username').then(function(user) {
        var pendingUser = {
            userId: user._id,
            username: user.username,
            creationDate: moment()
        };
        return [pendingUser, dbHelper.addPendingUser(userId, pendingUser, override)];
    }).spread(function(pendingUser, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, pendingUser, 'new_pending_user');
        return pendingUser;
    });
};

socketUsersHelper.createGroup = function(userId, username, groupName, contacts) {
    contacts.push({
        userId: userId,
        username: username,
        admin: true
    });
    return dbHelper.createGroup(userId, username, groupName, contacts).then(function(dbGroup) {
        var group = {
            groupId: dbGroup._id,
            groupName: dbGroup.groupName
        };
        var promises = [];
        for (var i = 0; i < contacts.length; i++) {
            group.admin = contacts[i].admin;
            promises.push(dbHelper.addGroupToUser(contacts[i].userId, group));
        }
        return [group, bluebird.all(promises)];
    }).spread(function(group, results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].nModified === 1)
                socketHelper.sendSocketMessage(contacts[i].userId, group, 'new_group');
        }
        return group;
    });
};

socketUsersHelper.removeContact = function(userId, contactId) {
    return dbHelper.getContactById(userId, contactId).then(function(contact) {
        if(!contact)
            throw errorHelper.resourceNotFoundException();
        return [contact, dbHelper.removeContact(userId, contact.userId)];
    }).spread(function(contact, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, contact, 'removed_contact');
        return contact;
    });
};

socketUsersHelper.removePendingUser = function(userId, contactId) {
    return dbHelper.getPendingUserById(userId, contactId).then(function(pendingUser) {
        if(!pendingUser)
            throw errorHelper.resourceNotFoundException();
        return [pendingUser, dbHelper.removePendingUser(userId, pendingUser.userId)];
    }).spread(function(pendingUser, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, pendingUser, 'removed_pending_user');
        return pendingUser;
    });
};

socketUsersHelper.removeBlockedUser = function(userId, contactId) {
    return dbHelper.getBlockedUserById(userId, contactId).then(function(blockedUser) {
        if(!blockedUser)
            throw errorHelper.resourceNotFoundException();
        return [blockedUser, dbHelper.removeBlockedUser(userId, blockedUser.userId)];
    }).spread(function(blockedUser, affectedRows) {
        if (affectedRows.nModified === 1)
            socketHelper.sendSocketMessage(userId, blockedUser, 'removed_blocked_user');
        return blockedUser;
    });
};

socketUsersHelper.sendMessageToUser = function(sender, recipient, message) {
    var isBlocked = usersHelper.isBlocked(sender.id, recipient.blockedUsers);
    // Prepara le operazioni asincrone che andranno eseguite
    // 0) Aggiungere il mittente come pendingUser del destinatario
    // 1) Aggiungere il destinatario come contatto del mittente
    // 2) Aggiungere il messaggio al mittente
    // 3) Aggiungere il messaggio al destinatario (SOLO se non è stato bloccato)
    var promises = [socketUsersHelper.addPendingUser(recipient._id, sender.id), socketUsersHelper.addContact(sender.id, recipient._id), dbHelper.addMessageToUser(sender.id, message)];
    if (!isBlocked)
        promises.push(dbHelper.addMessageToUser(recipient._id, message));
    // I primi due risultati delle promesse saranno undefined, perchè non hanno ritorno
    // I risultati 2 e 3 avranno il messaggio inserito nel database. I messaggi differiscono solo dal loro ObjectId
    // E' importante ritornare i messaggi ai rispettivi utenti, perchè gli utenti dovranno poi chiedere al server la partial view del messaggio inviando il corretto id
    return bluebird.all(promises).then(function(results) {
        socketHelper.sendSocketMessage(sender.id, results[2]);
        if (!isBlocked)
            socketHelper.sendSocketMessage(recipient._id, results[3]);
    });
};

socketUsersHelper.sendMessageToGroup = function(sender, group, message) {
    return groupsHelper.addMessageToGroup(group.users, message, group).then(function(messages) {
        for(var i = 0; i < group.users.length; i++)
        {
            /*Questo si chiama barare.
              Il messaggio in caso di gruppo consiste in un messaggio nel quale il recipient è sempre il gruppo ed il mittente è colui che lo ha inviato.
              Questo messaggio sarà poi salvato nella lista di ogni utente che per accedere alla conversazione dovrà semplicemente chiedere tutti i messaggi diretti al gruppo.
              Il problema è che nella notifica di arrivo del messaggio, se il mittente è il vero utente che ha inviato il messaggio, quando il destinatario cliccherà sulla notifica
              non otterrà l'id del gruppo nel quale risiede il messaggio, ma dell'utente che ha inviato il messaggio. In pratica, cliccando sulla notifica non aprirà la chat di gruppo,
              ma la chat privata del mittente. Per ovviare a questo problema eseguo uno spoofing dell'id del mittente sostituendolo a quello del gruppo ( cioè il destinatario ).
              Questa modifica non ha particolari ripercussioni, perchè tocca solo la notifica inviata tramite websocket. Il vero messaggio memorizzato sul database non viene chiaramente
              toccato*/
            messages[i].senderId = messages[i].recipientId;
            socketHelper.sendSocketMessage(group.users[i].userId, messages[i]);
        }
    });
};

module.exports = socketUsersHelper;