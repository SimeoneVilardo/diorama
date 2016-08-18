var groupsHelper = {};
var bluebird = require('bluebird');
var dbHelper = require('../helpers/database-helper.js');
var utilityHelper = require('../helpers/utility-helper.js');

groupsHelper.addMessageToGroup = function(users, message, group) {
    var promises = [];
    for (var i = 0; i < users.length; i++) {
        promises.push(dbHelper.addMessageToUser(users[i].userId, message));
    }
    return Promise.all(promises);
};

groupsHelper.getEditGroupUsers = function(userId, groupUsers, contacts) {
    var users = joinGroupUsersAndContacts(groupUsers, contacts);
    users = removeDuplicatedUsers(users);
    users = removeCurrentUserFromGroupUsers(userId, users);
    users = flagUsersAsGroupUsers(groupUsers, users);
    users = sortGroupUsers(users);
    return users;
};

groupsHelper.addUser = function(groupId, userId, group, user) {
    return bluebird.join(dbHelper.addUserToGroup(groupId, user), dbHelper.addGroupToUser(userId, group), function (data1, data2) {
        return groupId;
    });
};

groupsHelper.removeUser = function(groupId, userId) {
    return bluebird.join(dbHelper.removeUserFromGroup(userId, groupId), dbHelper.removeGroupFromUser(userId, groupId), function (data1, data2) {
        return groupId;
    });
};

function flagUsersAsGroupUsers(groupUsers, users) {
    for (var uIndex = 0; uIndex < users.length; uIndex++) {
        for (var gIndex = 0; gIndex < groupUsers.length; gIndex++) {
            if (users[uIndex].userId.equals(groupUsers[gIndex].userId)) {
                users[uIndex].groupUser = true;
                break;
            }
        }
    }
    return users;
}

function removeCurrentUserFromGroupUsers(userId, groupUsers) {
    for (var i = 0; i < groupUsers.length; i++)
    {
        if(groupUsers[i].userId.equals(userId))
            groupUsers.splice(i, 1);
    }
    return groupUsers;
}

function sortGroupUsers(groupUsers) {
    return groupUsers.sort(utilityHelper.dynamicSort('groupUser'));
}

function joinGroupUsersAndContacts(groupUsers, contacts) {
    for (var i = 0; i < groupUsers.length; i++) {
        groupUsers.groupUser = true;
    }
    var users = groupUsers.concat(contacts);
    return users;
}

function removeDuplicatedUsers(users) {
    for (var i = 0; i < users.length; ++i) {
        for (var j = i + 1; j < users.length; ++j) {
            if (users[i].userId.equals(users[j].userId))
                users.splice(j--, 1);
        }
    }
    return users;
}

module.exports = groupsHelper;