var mongoose = require('mongoose');
var user = require('./userGroup');
var utilityHelper = require('../helpers/utility-helper');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    groupName: { type: String, required: true},
    creator: {
        userId: Schema.Types.ObjectId,
        username: String
    },
    users: [user.schema],
    creationDate: {type: Date, default: Date.now }
});

groupSchema.pre('save', function(callback) {
    var group = this;
    utilityHelper.createGroupDefaultPicture(group._id).then(function () {
        callback();
    }).catch(function(err) {
        callback(err);
    });
});

var group = mongoose.model('group', groupSchema);
module.exports = group;