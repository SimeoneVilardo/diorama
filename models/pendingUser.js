var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var pendingUserSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

var pendingUser = mongoose.model('pendingUser', pendingUserSchema);
module.exports = pendingUser;