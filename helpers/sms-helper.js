var smsHelper = {};
var Promise = require('bluebird');
var https = require('https');
var qs = require('querystring');
var securityHelper = require('../helpers/security-helper.js');
var config = require('../config');

smsHelper.sendSignUp = function(phone, username, password, code) {
    var message = config.sms.signup_text.replace('@username', username).replace('@password', password).replace('@code', code);
    return smsHelper.sendSms(phone, message);
};

smsHelper.sendValidation = function(phone, username, code) {
    var message = config.sms.validation_text.replace('@username', username).replace('@code', code);
    return smsHelper.sendSms(phone, message);
};

smsHelper.sendRequestResetPasswordSms = function(phone, username, code) {
    var message = config.sms.request_reset_password_text.replace('@username', username).replace('@code', code);
    return smsHelper.sendSms(phone, message);
};

smsHelper.sendMailChanged = function(phone, username, oldMail) {
    var message = config.sms.mail_changed_text.replace('@username', username).replace('@mail', oldMail);
    return smsHelper.sendSms(phone, message);
};

smsHelper.sendPhoneChanged = function(phone, username, oldPhone) {
    var message = config.sms.phone_changed_text.replace('@phone', oldPhone).replace('@username', username);
    return smsHelper.sendSms(phone, message);
};

smsHelper.sendRecoverUsername = function(phone, username) {
    var message = config.sms.recover_username_text.replace('@username', username);
    return smsHelper.sendSms(phone, message);
};


// smsHelper.sendSms = function(phone, message) {
//     if (!config.sms.debug) {
//         return new Promise(function(resolve, reject) {
//             var data = {
//                 username: config.sms.username,
//                 numbers: phone,
//                 message: message,
//                 hash: config.sms.hash
//             };
//             var postData = qs.stringify(data);

//             var postOptions = {
//                 host: config.sms.host,
//                 port: config.sms.https_port,
//                 path: config.sms.send_api,
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Content-Length': Buffer.byteLength(postData)
//                 }
//             };

//             var request = https.request(postOptions, function(res) {
//                 var result = '';
//                 res.setEncoding('utf8');
//                 res.on('data', function(chunk) {
//                     result += chunk;
//                 });
//                 res.on('end', function() {
//                     var smsResponse = JSON.parse(result);
//                     smsResponse.phone_status = smsResponse.status;
//                     resolve(smsResponse);
//                 });
//             });

//             request.on('error', function(error) {
//                 reject(error);
//             });

//             request.write(postData);
//             request.end();
//         });
//     }
//     else {
//         return new Promise(function(resolve, reject) {
//             resolve(config.sms.debug_response);
//         });
//     }
// };

smsHelper.sendSms = function(phone, message) {
    if (!config.sms.debug) {
        return new Promise(function(resolve, reject) {
            var data = {
                message_type: config.sms.message_type,
                phone_numbers: [phone],
                text: message,
                sender_string: config.sms.sender
            };
            var postData = JSON.stringify(data);

            var postOptions = {
                host: config.sms.host,
                port: config.sms.https_port,
                path: config.sms.send_api,
                method: config.sms.method,
                headers: {
                    'Authorization': securityHelper.createBasicAuthHeader(config.sms.username, 'yyy'),
                    'Content-Type': config.sms.content_type,
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            var request = https.request(postOptions, function(res) {
                var result = '';
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    result += chunk;
                });
                res.on('end', function() {
                    var smsResponse = null;
                    // Forse tutti questi controlli sono un po' overkill, però voglio essere sicuro che non crashi tutto. Il JSON.parse mi fa molta paura!!!
                    if (result && result !== '') {
                        try {
                            smsResponse = JSON.parse(result);
                            smsResponse.status_sms = (smsResponse.message_id && smsResponse.message_id !== '') ? 'success' : 'error';
                        }
                        catch (err) {
                            smsResponse.parseError = err;
                            smsResponse.status_sms = 'error';
                        }
                    }
                    else {
                        smsResponse = {
                            status_sms: 'error'
                        };
                    }
                    if(smsResponse.status_sms !== 'success' && smsResponse.error)
                        smsResponse.error = smsResponse.error.replace(/+/g, ' ');
                    resolve(smsResponse);
                });
            });

            request.on('error', function(error) {
                reject(error);
            });

            request.write(postData);
            request.end();
        });
    }
    else {
        return new Promise(function(resolve, reject) {
            resolve(config.sms.debug_response);
        });
    }
};

module.exports = smsHelper;