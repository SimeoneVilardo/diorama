var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var attachment = require('./attachment');

var messageSchema = new Schema({
    senderId: Schema.Types.ObjectId,
    senderName: String,
    recipientId: Schema.Types.ObjectId,
    recipientName: String,
    date: {type: Date, default: Date.now },
    seen: Boolean,
    body: String,
    attachments: [attachment.schema]
});

var message = mongoose.model('message', messageSchema);
module.exports = message;