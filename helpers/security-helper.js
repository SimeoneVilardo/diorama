var securityHelper = {};

var expressJwt = require('express-jwt');
var bluebird = require('bluebird');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var get_ip = require('ipware')().get_ip;
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var dbHelper = require('../helpers/database-helper.js');
var errorHelper = require('../helpers/error-helper.js');
var utilityHelper = require('../helpers/utility-helper.js');
var config = require('../config.js');

securityHelper.jwtAuthentication = function() {
    return expressJwt({
        secret: config.security.jwt_secret,
        credentialsRequired: false,
        getToken: securityHelper.extractTokenFromHeaderOrQuerystringOrCookie,
        /* Questo metodo è stato modificatp all'interno della libreria express-jwt.
           Originariamente, in caso di token revocato, la libreria ritorna un errore.
           Dato che è possibile che il server revochi il token senza che il client lo sappia e lo cancelli,
           il client avrebbe continuato ad inviare il token revocato non riuscendo a accedere a nessuna pagina, perchè
           tutte richiedono la verifica del token al fine di capire se l'utente è loggato. Con questa modifica, la express-jwt
           ritorna nel decoded token al posto di un errore, in pratica "sloggando" l'utente.
           IMPORTANTE: Un aggiornamento del modulo express-jwt potrebbe portare alla perdita della modifica e quindi ad un malfuzionamento del sistema!*/
        isRevoked: function(req, payload, done) {
            securityHelper.isTokenRevoked(payload).then(function(revoked) {
                return done(null, revoked);
            }).catch(function(err) {
                return done(err, true);
            });
        }
    });
};

securityHelper.extractTokenFromHeaderOrQuerystringOrCookie = function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.bearerToken) {
        return req.query.bearerToken;
    }
    else if (req.cookies && req.cookies.bearerToken) {
        return req.cookies.bearerToken;
    }
    return null;
};

securityHelper.decodeToken = function(token) {
    var decoded = jwt.verify(token, config.security.jwt_secret);
    return decoded;
};

securityHelper.mustBeAuthenticated = function(req, res, next) {
    if (req.user)
        next();
    else
        throw errorHelper.unauthorizedException('L\'utente deve essere autenticato');
};

securityHelper.mustBeGroupAdmin = function(req, res, next) {
    var groupId = req.body.groupId;
    if (!groupId)
        throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
    return securityHelper.isGroupAdmin(req.user.id, groupId).then(function(admin) {
        if (!admin)
            throw errorHelper.unauthorizedException('L\'utente non dispone dei permessi per modificare il gruppo');
        next();
    }).catch(function(err) {
        next(err);
    });
};

securityHelper.mustBeValidated = function(req, res, next) {
    if (req.user && req.user.validated)
        next();
    else
        throw errorHelper.unauthorizedException('L\'utente deve essere validato');
};

securityHelper.isGroupAdmin = function(userId, groupId) {
    return dbHelper.getUserFromGroup(userId, groupId).then(function(user) {
        if(!user)
            throw errorHelper.resourceNotFoundException();
        return user.admin;
    });
};

securityHelper.mustNotBeAuthenticated = function(req, res, next) {
    if (!req.user)
        next();
    else
        throw errorHelper.unauthorizedException('L\'utente non deve essere autenticato');
};

securityHelper.mustNotBeValidated = function(req, res, next) {
    if (!req.user || req.user && !req.user.validated)
        next();
    else
        throw errorHelper.unauthorizedException('L\'utente non deve essere validato');
};

securityHelper.refreshValidationToken = function(userId) {
    var token = utilityHelper.generateUUID() + utilityHelper.generateUUID();
    return dbHelper.setValidationToken(userId, token).then(function (affectedRows) {
        return [token, affectedRows];
    });
};

securityHelper.refreshValidationCode = function(userId) {
    var code = utilityHelper.generateRandomCode(6);
    return dbHelper.setValidationCode(userId, code).then(function (affectedRows) {
        return [code, affectedRows];
    });
};

securityHelper.setResetPasswordToken = function(userId) {
    var token = utilityHelper.generateUUID() + utilityHelper.generateUUID();
    return dbHelper.setResetPasswordToken(userId, token).return(token);
};

securityHelper.setResetPasswordCode = function(userId) {
    var code = utilityHelper.generateRandomCode(6);
    return dbHelper.setResetPasswordCode(userId, code).return(code);
};

securityHelper.generateRandomToken = function(iteration) {
    var token = '';
    for (var i = 0; i < iteration; i++) {
        token = token + rand();
    }
    return token;
};

securityHelper.comparePasswords = function(userPassword, dbPassword) {
    return bcrypt.compareAsync(userPassword, dbPassword);
};

securityHelper.hashPassword = function(password) {
    return bcrypt.genSaltAsync(100).then(function(salt) {
        return bcrypt.hashAsync(password, salt, null);
    });
};

securityHelper.createBasicAuthHeader = function(username, password) {
    var data = username + ':' + password;
    var base64data = new Buffer(data).toString('base64');
    var authHeader = 'Basic ' + base64data;
    return authHeader;
};

securityHelper.issueToken = function(user, ip) {
    var expire = moment().add(1, 'days').unix();
    var payload = {
        id: user._id,
        exp: expire,
        iss: config.path.global_site_root,
        username: user.username,
        validated: user.validated,
        comunication: user.comunication,
        mail: user.mail,
        phone: user.phone,
        ip: ip
    };
    var token = jwt.sign(payload, config.security.jwt_secret);
    return token;
};

securityHelper.revokeToken = function(token) {
    return dbHelper.revokeToken(token);
};

securityHelper.isTokenRevoked = function(token) {
    return dbHelper.getToken(token).then(function(token) {
        if (token)
            return true;
        else
            return false;
    });
};

securityHelper.getClientIP = function(req) {
    var ip = get_ip(req).clientIp;
    return ip;
};

function rand() {
    return Math.random().toString(36).substr(2);
}

module.exports = securityHelper;