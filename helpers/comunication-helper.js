var comunicationHelper = {};
var mailHelper = require('../helpers/mail-helper.js');
var smsHelper = require('../helpers/sms-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var config = require('../config');

comunicationHelper.sendSignUp = function(comunication, username, password, mail, phone, token) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendSignUp(username, password, mail, token);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendSignUp(phone, username, password, token);
    else
        throw errorHelper.comunicationNotFoundException();
};

comunicationHelper.sendValidation = function(comunication, username, mail, phone, token) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendValidation(username, mail, token);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendValidation(phone, username, token);
    else
        throw errorHelper.comunicationNotFoundException();
};

comunicationHelper.sendRequestResetPassword = function(comunication, username, mail, phone, token) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendRequestResetPassword(username, mail, token);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendRequestResetPassword(phone, username, token);
    else
        throw errorHelper.comunicationNotFoundException();
};

comunicationHelper.sendMailChanged = function(comunication, username, mail, phone, oldMail) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendMailChanged(username, mail, oldMail);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendMailChanged(phone, username, oldMail);
    else
        throw errorHelper.comunicationNotFoundException();
};

comunicationHelper.sendPhoneChanged = function(comunication, username, mail, phone, oldPhone) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendMailChanged(username, mail, oldPhone);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendPhoneChanged(phone, username, oldPhone);
    else
        throw errorHelper.comunicationNotFoundException();
};

comunicationHelper.sendRecoverUsername = function(comunication, username, mail, phone) {
    if (comunication === config.comunication.mail)
        return mailHelper.sendRecoverUsername(username, mail);
    else if (comunication === config.comunication.phone)
        return smsHelper.sendRecoverUsername(phone, username);
    else
        throw errorHelper.comunicationNotFoundException();
};

module.exports = comunicationHelper;