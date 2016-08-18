var databaseContactsHelper = {};

var User = require('../../models/user');
var errorHelper = require('../../helpers/error-helper.js');

databaseContactsHelper.addPendingUser = function(userId, pendingUser, override) {
    var condition;
    var data;
    if (override) {
        condition = {
            _id: userId,
            'pendingUsers.userId': {
                $ne: pendingUser.userId
            }
        };
        data = {
            $addToSet: {
                "pendingUsers": pendingUser
            },
            $pull: {
                'contacts': {
                    userId: pendingUser.userId
                },
                'blockedUsers': {
                    userId: pendingUser.userId
                }
            }
        };
    }
    else {
        condition = {
            _id: userId,
            'contacts.userId': {
                $ne: pendingUser.userId
            },
            'blockedUsers.userId': {
                $ne: pendingUser.userId
            },
            'pendingUsers.userId': {
                $ne: pendingUser.userId
            }
        };
        data = {
            $addToSet: {
                "pendingUsers": pendingUser
            }
        };
    }
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

databaseContactsHelper.addContact = function(userId, contact, override) {
    var condition;
    var data;
    if (override) {
        condition = {
            _id: userId,
            'contacts.userId': {
                $ne: contact.userId
            }
        };
        data = {
            $addToSet: {
                "contacts": contact
            },
            $pull: {
                'blockedUsers': {
                    userId: contact.userId
                },
                'pendingUsers': {
                    userId: contact.userId
                }
            }
        };
    }
    else {
        condition = {
            _id: userId,
            'contacts.userId': {
                $ne: contact.userId
            },
            'blockedUsers.userId': {
                $ne: contact.userId
            },
            'pendingUsers.userId': {
                $ne: contact.userId
            }
        };
        data = {
            $addToSet: {
                "contacts": contact
            }
        };
    }
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

databaseContactsHelper.addBlockedUser = function(userId, blockedUser, override) {
    var condition;
    var data;
    if (override) {
        condition = {
            _id: userId,
            'blockedUsers.userId': {
                $ne: blockedUser.userId
            }
        };
        data = {
            $addToSet: {
                "blockedUsers": blockedUser
            },
            $pull: {
                'contacts': {
                    userId: blockedUser.userId
                },
                'pendingUsers': {
                    userId: blockedUser.userId
                }
            }
        };
    }
    else {
        condition = {
            _id: userId,
            'contacts.userId': {
                $ne: blockedUser.userId
            },
            'blockedUsers.userId': {
                $ne: blockedUser.userId
            },
            'pendingUsers.userId': {
                $ne: blockedUser.userId
            }
        };
        data = {
            $addToSet: {
                "blockedUsers": blockedUser
            }
        };
    }
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

databaseContactsHelper.getContactById = function(userId, contactId) {
    var query = {
        _id: userId,
        'contacts.userId': contactId
    };
    var projection = {'contacts.$': 1};
    return User.findOne(query, projection).lean().exec().then(function (user) {
        if(!user)
            return null;
        return user.contacts[0];
    });
};

databaseContactsHelper.getPendingUserById = function(userId, contactId) {
    var query = {
        _id: userId,
        'pendingUsers.userId': contactId
    };
    var projection = {'pendingUsers.$': 1};
    return User.findOne(query, projection).lean().exec().then(function (user) {
        if(!user)
            return null;
        return user.pendingUsers[0];
    });
};

databaseContactsHelper.getBlockedUserById = function(userId, contactId) {
    var query = {
        _id: userId,
        'blockedUsers.userId': contactId
    };
    var projection = {'blockedUsers.$': 1};
    return User.findOne(query, projection).lean().exec().then(function (user) {
        if(!user)
            return null;
        return user.blockedUsers[0];
    });
};

databaseContactsHelper.removeContact = function (userId, contactId) {
    var condition = {
        _id: userId,
        'contacts.userId': contactId
    };
    var data = {$pull: {'contacts': {userId: contactId}}};
    var options = {safe: true};
    return User.update(condition, data, options).exec();
};

databaseContactsHelper.removePendingUser = function (userId, contactId) {
    var condition = {
        _id: userId,
        'pendingUsers.userId': contactId
    };
    var data = {$pull: {'pendingUsers': {userId: contactId}}};
    var options = {safe: true};
    return User.update(condition, data, options).exec();
};

databaseContactsHelper.removeBlockedUser = function (userId, contactId) {
    var condition = {
        _id: userId,
        'blockedUsers.userId': contactId
    };
    var data = {$pull: {'blockedUsers': {userId: contactId}}};
    var options = {safe: true};
    return User.update(condition, data, options).exec();
};


module.exports = databaseContactsHelper;