var databaseGroupHelper = {};

var Group = require('../../models/group');
var User = require('../../models/user');
var errorHelper = require('../../helpers/error-helper.js');

databaseGroupHelper.getGroupById = function(userId, groupId, fields) {
    var query = {
        _id: groupId,
        'users.userId': userId
    };
    var objQuery = Group.findOne(query);
    if(fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseGroupHelper.checkContactsToCreateGroup = function(userId, username, contacts) {
    var contactsQuery = [{
        _id: userId,
        username: username
    }];
    for (var i = 0; i < contacts.length; i++) {
        contactsQuery.push({
            _id: contacts[i].id,
            username: contacts[i].username
        });
    }
    return User.count().or(contactsQuery).exec();
};

databaseGroupHelper.createGroup = function(userId, username, groupName, users) {
    var newGroup = new Group({
        groupName: groupName,
        creator: {
            userId: userId,
            username: username
        },
        users: users
    });
    return newGroup.save();
};

databaseGroupHelper.addGroupToUser = function(userId, group) {
    var condition = {
        _id: userId,
        'groups.groupId': {
            $ne: group.groupId
        }
    };
    var data = {
        $addToSet: {
            "groups": group
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

databaseGroupHelper.addUserToGroup = function(groupId, user) {
    var condition = {
        _id: groupId,
        'users.userId': {
            $ne: user.userId
        }
    };
    var data = {
        $addToSet: {
            users: user
        }
    };
    var options = {
        safe: true
    };
    return Group.update(condition, data, options).exec();
};

databaseGroupHelper.removeGroupFromUser = function(userId, groupId) {
    var condition = {
        _id: userId
    };
    var update = {
        $pull: {
            'groups': {
                groupId: groupId
            }
        }
    };
    var options = {
        multi: false
    };
    return User.update(condition, update, options).exec();
};

databaseGroupHelper.removeUserFromGroup = function(userId, groupId) {
    var condition = {
        _id: groupId
    };
    var update = {
        $pull: {
            'users': {
                userId: userId
            }
        }
    };
    var options = {
        multi: false
    };
    return Group.update(condition, update, options).exec();
};

databaseGroupHelper.getUserFromGroup = function(userId, groupId) {
    var condition = {
        _id: groupId,
        'users.userId': userId
    };
    var projection = {
        'users.$': 1
    };
    return Group.findOne(condition, projection).lean().exec().then(function(group) {
        if (!group)
            return null;
        if (group.users.length !== 1)
            return null;
        return group.users[0];
    });
};


module.exports = databaseGroupHelper;