var databaseMessagesHelper = {};

var mongoose = require('mongoose');
var User = require('../../models/user');
var Message = require('../../models/message');
var errorHelper = require('../../helpers/error-helper.js');

databaseMessagesHelper.getMessagesById = function(userId) {
    var query = {
        _id: userId
    };
    var fields = 'messages';
    return User.findOne(query).select(fields).lean().exec();
};

databaseMessagesHelper.getMessageById = function(userId, msgId) {
    var query = {
        _id: userId,
        'messages._id': msgId
    };
    var projection = {'messages.$': 1};
    return User.findOne(query, projection).lean().exec().then(function (user) {
        if(!user)
            return null;
        return user.messages[0];
    });
};

databaseMessagesHelper.getUserConversationById = function(userId, contactId) {
    return User.aggregate([{
        $match: {
            _id: userId
        }
    }, {
        $unwind: "$messages"
    }, {
        $match: {
            $or: [{
                "messages.senderId": contactId,
                "messages.recipientId": userId
            }, {
                "messages.senderId": userId,
                "messages.recipientId": contactId
            }]
        }
    }, {
        $group: {
            _id: "$_id",
            messages: {
                $push: "$messages"
            }
        }
    }]).exec().then(function(projection) {
        if(projection && projection.length > 0 && projection[0].messages)
            return projection[0].messages;
        return [];    
    });
};

databaseMessagesHelper.getGroupConversationById = function (userId, groupId) {
    return User.aggregate([
        {$match: {_id: userId}},
        {$unwind: "$messages"},
        {$match: {"messages.recipientId": groupId}},
        {$group: {_id: "$_id", messages: {$push: "$messages"}}}
    ]).exec().then(function (projection) {
        if(projection && projection.length > 0 && projection[0].messages)
            return projection[0].messages;
        return [];    
    });
};

databaseMessagesHelper.addMessageToUser = function(userId, message) {
    var dbMessage = new Message({
        senderId: message.senderId,
        senderName: message.senderName,
        recipientId: message.recipientId,
        recipientName: message.recipientName,
        body: message.body
    });
    if (message.attachments)
        dbMessage.attachments = message.attachments;
    var update = {
        $push: {
            messages: dbMessage
        }
    };
    return User.update({
        _id: userId
    }, update).exec().then(function(affectedRows) {
        return dbMessage.toObject();
    });
};

databaseMessagesHelper.getAttachmentById = function(userId, attachId) {
    var query = {
        _id: userId,
        'messages.attachments._id': attachId
    };
    var projection = {'messages.attachments.$': 1};
    return User.findOne(query, projection).lean().exec().then(function (user) {
        if(!user)
            return null;
        if(!user.messages || user.messages.length < 1)
            return null;    
        if(!user.messages[0].attachments || user.messages[0].attachments.length < 0)  
            return null;
        return user.messages[0].attachments[0];
    });
};

module.exports = databaseMessagesHelper;