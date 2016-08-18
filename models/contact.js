var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});

var contact = mongoose.model('contact', contactSchema);
module.exports = contact;