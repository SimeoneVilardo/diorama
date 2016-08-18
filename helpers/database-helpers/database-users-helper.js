var databaseUsersHelper = {};

var User = require('../../models/user');

databaseUsersHelper.getUserBasicInfoByUsername = function(username) {
    var query = {
        username: username
    };
    var fields = 'username password comunication mail phone';
    return User.findOne(query).select(fields).lean().exec();
};

databaseUsersHelper.getUserBasicInfoById = function(userId) {
    var query = {
        _id: userId
    };
    var fields = 'username password comunication mail phone';
    return User.findOne(query).select(fields).lean().exec();
};

databaseUsersHelper.getUserByUsername = function(username, fields) {
    var query = {
        username: username
    };
    var objQuery = User.findOne(query);
    if (fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseUsersHelper.getUserByMail = function(mail, fields) {
    var query = {
        mail: mail
    };
    var objQuery = User.findOne(query);
    if (fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseUsersHelper.getUserById = function(userId, fields) {
    var query = {
        _id: userId
    };
    var objQuery = User.findOne(query);
    if (fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseUsersHelper.getUserByMailOrUsername = function(login, fields) {
    var query = {
        $or: [{
            username: login
        }, {
            mail: login
        }]
    };
    var objQuery = User.findOne(query);
    if (fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseUsersHelper.getUserByMailOrPhone = function(login, fields) {
    var query = null;
    if (isNaN(login)) {
        query = {
            mail: login
        };
    }
    else {
        query = {
            phone: login
        };
    }
    var objQuery = User.findOne(query);
    if (fields)
        objQuery = objQuery.select(fields);
    return objQuery.lean().exec();
};

databaseUsersHelper.getUsersByUsername = function(username, ids, fields) {
    var query = {
        username: new RegExp("^" + username, 'i')
    };
    var objQuery = User.find(query);
    if (fields)
        objQuery = objQuery.select(fields);
    if (ids)
        objQuery = objQuery.where('_id').nin(ids);
    return objQuery.lean().exec();
};

databaseUsersHelper.validateByMail = function(token) {
    var condition = {
        'validationToken.token': token,
        'validationToken.expirationDate': {
            $gt: new Date()
        }
    };
    var data = {
        validated: true,
        $unset: {
            validationToken: 1
        }
    };
    var options = {
        safe: true,
        new: true
    };
    return User.findOneAndUpdate(condition, data, options).exec();
};

databaseUsersHelper.validateByPhone = function(code) {
    var condition = {
        'validationCode.code': code,
        'validationCode.expirationDate': {
            $gt: new Date()
        }
    };
    var data = {
        validated: true,
        $unset: {
            validationCode: 1
        }
    };
    var options = {
        safe: true,
        new: true
    };
    return User.findOneAndUpdate(condition, data, options).exec();
};

databaseUsersHelper.setComunication = function(userId, comunication) {
    var condition = {
        _id: userId
    };
    var data = {
        $set: {
            comunication: comunication
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

module.exports = databaseUsersHelper;