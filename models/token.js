var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    exp: { type: Number, required: true},
    iat: { type: Number, required: true},
    iss: { type: String, required: true},
    username: { type: String, required: true},
    mail: { type: String},
    phone: { type: Number}
});

var token = mongoose.model('token', tokenSchema);
module.exports = token;