var databaseAuthenticationHelper = {};

var moment = require('moment');
var bluebird = require('bluebird');
var User = require('../../models/user');
var Token = require('../../models/token');
var utilityHelper = require('../../helpers/utility-helper.js');


databaseAuthenticationHelper.createUserWithMail = function(comunication, username, password, mail, phone) {
    var newUser = new User({
        username: username,
        password: password,
        comunication: comunication,
        mail: mail,
        validationToken: {
            token: utilityHelper.generateUUID() + utilityHelper.generateUUID(),
            expirationDate: moment().add(1, 'hours')
        }
    });
    if(phone && phone !== '' && !isNaN(phone))
        newUser.phone = phone;
    return newUser.save();
};

databaseAuthenticationHelper.createUserWithPhone = function(comunication, username, password, mail, phone) {
    var newUser = new User({
        username: username,
        password: password,
        comunication: comunication,
        phone: phone,
        validationCode: {
            code: utilityHelper.generateRandomCode(6),
            expirationDate: moment().add(1, 'days')
        }
    });
    if(mail && mail !== '')
        newUser.mail = mail;
    return newUser.save();
};

databaseAuthenticationHelper.setValidationToken = function(userId, token) {
    var validationToken = {
        token: token,
        expirationDate: moment().add(1, 'hours')
    };
    var condition = {
        _id: userId
    };
    var update = {
        $set: {
            validationToken: validationToken
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, update, options).lean().exec();
};

databaseAuthenticationHelper.setValidationCode = function(userId, code) {
    var validationCode = {
        code: code,
        expirationDate: moment().add(1, 'days')
    };
    var condition = {
        _id: userId,
        'validationCode.expirationDate': { $lt: new Date() }
    };
    var update = {
        $set: {
            validationCode: validationCode
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, update, options).lean().exec();
};

databaseAuthenticationHelper.setResetPasswordToken = function(userId, token) {
    var resetPasswordToken = {
        token: token,
        expirationDate: moment().add(1, 'hours')
    };
    var condition = {
        _id: userId
    };
    var update = {
        $set: {
            resetPasswordToken: resetPasswordToken
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, update, options).lean().exec();
};

databaseAuthenticationHelper.setResetPasswordCode = function(userId, code) {
    var resetPasswordCode = {
        code: code,
        expirationDate: moment().add(1, 'days')
    };
    var condition = {
        _id: userId
    };
    var update = {
        $set: {
            resetPasswordCode: resetPasswordCode
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, update, options).lean().exec();
};

databaseAuthenticationHelper.setMail = function(userId, mail) {
    var condition = {
        _id: userId
    };
    var update = {
        $set: {
            mail: mail
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, update, options).lean().exec();
};

databaseAuthenticationHelper.revokeToken = function(token) {
    var newToken;
    try {
        newToken = new Token({
            exp: token.exp,
            iat: token.iat,
            iss: token.iss,
            username: token.username
        });
    }
    catch (err) {
        return bluebird.reject(err);
    }
    return newToken.save();
};

databaseAuthenticationHelper.getToken = function(token) {
    var query;
    try {
        query = {
            exp: token.exp,
            iat: token.iat,
            iss: token.iss,
            username: token.username,
            mail: token.mail
        };
    }
    catch (err) {
        return bluebird.reject(err);
    }
    return Token.findOne(query).lean().exec();
};

databaseAuthenticationHelper.resetPassword = function(token, password) {
    var condition = {
        'resetPasswordToken.token': token,
        'resetPasswordToken.expirationDate': {
            $gt: new Date()
        }
    };
    var data = {
        $set: {
            password: password
        },
        $unset: {
            resetPasswordToken: 1
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

databaseAuthenticationHelper.setPassword = function(userId, password) {
    var condition = {
        _id: userId
    };
    var data = {
        $set: {
            password: password
        }
    };
    var options = {
        safe: true
    };
    return User.update(condition, data, options).exec();
};

module.exports = databaseAuthenticationHelper;