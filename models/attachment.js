var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var attachmentSchema = new Schema({
    fileName: String,
    originalFileName: String,
    mime: String
});

var attachment = mongoose.model('attachment', attachmentSchema);
module.exports = attachment;