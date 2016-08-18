var mongoose = require('mongoose');
var contact = require('./contact');
var pendingUser = require('./pendingUser');
var blockedUser = require('./blockedUser');
var message = require('./message');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var utilityHelper = require('../helpers/utility-helper');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    mail: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    phone: {
        type: Number,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    comunication: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    validationToken: {
        token: String,
        expirationDate: Date
    },
    validationCode: {
        code: Number,
        expirationDate: Date
    },
    resetPasswordToken: {
        token: String,
        expirationDate: Date
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    contacts: [contact.schema],
    blockedUsers: [blockedUser.schema],
    pendingUsers: [pendingUser.schema],
    groups: [new Schema({
        groupId: Schema.Types.ObjectId,
        groupName: String,
        admin: Boolean,
        creationDate: {
            type: Date,
            default: Date.now
        }
    }, {
        _id: false
    })],
    messages: [message.schema]
});

userSchema.pre('save', function(callback) {
    var user = this;
    utilityHelper.createDefaultPicture(user._id).then(function() {
        return bcrypt.genSaltAsync(100);
    }).then(function(salt) {
        return bcrypt.hashAsync(user.password, salt, null);
    }).then(function(hash) {
        user.password = hash;
        callback();
    }).catch(function(err) {
        callback(err);
    });
});

var user = mongoose.model('user', userSchema);
module.exports = user;