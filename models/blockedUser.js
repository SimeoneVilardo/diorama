var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var blockedUserSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

var blockedUser = mongoose.model('blockedUser', blockedUserSchema);
module.exports = blockedUser;