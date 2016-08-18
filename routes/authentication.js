var express = require('express');
var router = express.Router();
var emailValidator = require("email-validator");
var extractDuplicateField = require('mongoose-extract-duplicate-field');
var url = require("url");
var bluebird = require("bluebird");
var securityHelper = require('../helpers/security-helper.js');
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var usersHelper = require('../helpers/users-helper.js');
var comunicationHelper = require('../helpers/comunication-helper.js');
var config = require('../config.js');

router.all('/', function(req, res, next) {
    var response = {
        message: 'Diorama Auth API OK'
    };
    res.json(response);
});

router.post('/signup', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var comunication = req.body.comunication;
    bluebird.try(function() {
        if (!username || !password || !comunication || (comunication === config.comunication.mail && !mail) || (comunication === config.comunication.phone && !phone))
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        if (mail && mail !== '' && !emailValidator.validate(mail))
            throw errorHelper.badRequestException('Indirizzo email non valido');
        if (phone && phone !== '' && isNaN(phone))
            throw errorHelper.badRequestException('Numero di telefono non valido');
        return usersHelper.signup(comunication, username, password, mail, phone);
    }).spread(function(user, validationInfo) {
        var response = {
            username: user.username,
            validationInfo: validationInfo,
            url: user.comunication === config.comunication.phone ? url.resolve(config.path.global_site_root, config.path.relative_validation) : config.path.global_site_root,
            message: user.comunication === config.comunication.phone ? config.messages.phone_validation : config.messages.mail_validation
        };
        var ip = securityHelper.getClientIP(req);
        var token = securityHelper.issueToken(user, ip);
        res.cookie(config.security.auth_cookie, token);
        res.json(response);
    }).catch(function(err) {
        if (err.name === 'MongoError' && err.code === 11000)
            return next(errorHelper.forbiddenException('Un utente con lo stesso campo ' + extractDuplicateField(err) + ' è già registrato nel database.'));
        next(err);
    });
});

router.post('/login', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    bluebird.try(function() {
        if (!username || !password)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserByUsername(username, 'username password comunication mail phone validated');
    }).then(function(user) {
        if (!user)
            throw errorHelper.unauthorizedException('Username o password errati');
        return [user, securityHelper.comparePasswords(password, user.password)];
    }).spread(function(user, logged) {
        if (!logged)
            throw errorHelper.unauthorizedException('Username o password errati');
        var ip = securityHelper.getClientIP(req);
        var token = securityHelper.issueToken(user, ip);
        var response = {
            token: token,
            url: config.path.global_site_root
        };
        res.cookie(config.security.auth_cookie, response.token);
        res.json(response);
    }).catch(function(err) {
        next(err);
    });
});

router.post('/logout', securityHelper.mustBeAuthenticated, function(req, res, next) {
    dbHelper.revokeToken(req.user).then(function(data) {
        var response = {
            url: config.path.global_site_root
        };
        res.clearCookie(config.security.auth_cookie);
        res.json(response);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/send-validation', securityHelper.mustBeAuthenticated, securityHelper.mustNotBeValidated, function(req, res, next) {
     req.user.comunication === config.comunication.mail ? securityHelper.refreshValidationToken(req.user.id) : securityHelper.refreshValidationCode(req.user.id).spread(function(token, affectedRows) {
         if(affectedRows.nModified === 0)
            throw errorHelper.forbiddenException('Impossibile aggiornare il database.');
        return comunicationHelper.sendValidation(req.user.comunication, req.user.username, req.user.mail, req.user.phone, token);
    }).then(function(comunicationInfo) {
        if (comunicationInfo.status !== 'success')
            throw errorHelper.forbiddenException(comunicationInfo.status);
        res.json(comunicationInfo);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/recover-username', securityHelper.mustNotBeAuthenticated, function(req, res, next) {
    var pattern = req.query.pattern;
    bluebird.try(function() {
        if (!pattern)
            throw errorHelper.badRequestException();    
        return dbHelper.getUserByMailOrPhone(pattern, 'username mail phone comunication');
    }).then(function(user) {
        if (!user)
            throw errorHelper.resourceNotFoundException('Utente non trovato');
        return comunicationHelper.sendRecoverUsername(user.comunication, user.username, user.mail, user.phone);
    }).then(function(comunicationInfo) {
        if (comunicationInfo.status !== 'success')
            throw errorHelper.forbiddenException(comunicationInfo.status);
        res.json(comunicationInfo);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/change-mail', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;
    bluebird.try(function() {
        if (!mail || !password)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserById(req.user.id, 'username password');
    }).then(function(user) {
        return securityHelper.comparePasswords(password, user.password);
    }).then(function(authorized) {
        if (!authorized)
            throw errorHelper.unauthorizedException('Password errata');
        return dbHelper.setMail(req.user.id, mail);
    }).then(function(affectedRows) {
        res.json(affectedRows);
    }).catch(function(err) {
        next(err);
    });
});

router.get('/request-reset-password', function(req, res, next) {
    var login = req.query.login;
    bluebird.try(function() {
        if (!login)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserByMailOrUsername(login);
    }).then(function(user) {
        return [user, user.comunication === config.comunication.mail ? securityHelper.setResetPasswordToken(user._id) : securityHelper.setResetPasswordCode(user._id)];
    }).spread(function(user, token) {
        return comunicationHelper.sendRequestResetPassword(user.comunication, user.username, user.mail, user.phone, token);
    }).then(function(mailResponse) {
        res.json(mailResponse);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/reset-password', function(req, res, next) {
    var token = req.body.token;
    var password = req.body.password;
    bluebird.try(function() {
        if (!password || !token)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return securityHelper.hashPassword(password);
    }).then(function(hashedPassword) {
        return dbHelper.resetPassword(token, hashedPassword);
    }).then(function(affectedRows) {
        if (affectedRows.nModified === 0)
            throw errorHelper.forbiddenException('La password non è stata modificata. Probabilmente il token di reset password non è valido');
        res.json(affectedRows);
    }).catch(function(err) {
        next(err);
    });
});

router.put('/change-password', securityHelper.mustBeAuthenticated, function(req, res, next) {
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    bluebird.try(function() {
        if (!oldPassword || !newPassword)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.getUserById(req.user.id, 'password');
    }).then(function(user) {
        return securityHelper.comparePasswords(oldPassword, user.password);
    }).then(function(authorized) {
        if (!authorized)
            throw errorHelper.unauthorizedException('Password errata');
        return securityHelper.hashPassword(newPassword);
    }).then(function(hashedPassword) {
        return dbHelper.setPassword(req.user.id, hashedPassword);
    }).then(function(affectedRows) {
        res.json(affectedRows);
    }).catch(function(err) {
        next(err);
    });
});

router.post('/validate-phone', function(req, res, next) {
    var code = req.body.code;
    bluebird.try(function() {
        if (!code)
            throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
        return dbHelper.validateByPhone(code);
    }).then(function(user) {
        if (!user.validated)
            throw next(errorHelper.badRequestException('Il codice di validazione fornito non è valido'));
        var ip = securityHelper.getClientIP(req);
        var token = securityHelper.issueToken({_id: user._id, username: user.username, validated: user.validated, comunication: user.comunication, mail: user.mail, phone:user.phone}, ip);
        res.cookie(config.security.auth_cookie, token);
        res.json({
            url: config.path.global_site_root
        });
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;