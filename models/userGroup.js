var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userGroupSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    admin: Boolean,
    creationDate: {type: Date, default: Date.now }
},{ _id : false });

var userGroup = mongoose.model('userGroup', userGroupSchema);
module.exports = userGroup;