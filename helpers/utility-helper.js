var utilityHelper = {};
var path = require('path');
var bluebird = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var copy = bluebird.promisify(require("fs.extra").copy);
var config = require('../config.js');

function randChar() {
    return Math.random().toString(36).substr(2);
}

function randNumber() {
    return Math.floor(Math.random()*10);
}

utilityHelper.generateUUID = function() {
    var str = uuid.v4();
    str = str.replaceAll('-', '');
    return str;
};

utilityHelper.generateRandomCode = function(iteration) {
    var code = '';
    for(var i = 0; i < iteration; i++)
    {
        code = code + randNumber();
    }
    return code;
};

utilityHelper.mergeObjects = function(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};


/*Canonizza l'id di MongoDB. L'ObjectID può essere spesso sia in formato String che in formato ObjectID, perchè viene spesso castato anche implicitamente.
  Nelle query però, questo può causare moltissimi problemi per questo motivo questo metodo controllo che l'id sia in formato ObjectID ed in caso contrario lo converte.
  Per aumentare la centralizzazione, questo metodo dovrebbe essere chiamato solo nel database-helper, che canonizza i parametri e poi delega l'esecuzione della query
  ai suoi sub-helper. L'unica eccezione compare nel metodo isBlocked dello users-helper, che richiede l'ObjectID al fine di confrontarlo con un altro ObjectID, ma non
  deve effettuare nessuna query. In nessun caso questo metodo andrà chiamato manualmente prima di eseguire una query dentro un helper che non sia il database-helper*/
utilityHelper.canonizeId = function(id) {
    if (id._bsontype)
        return id;
    else
        return mongoose.Types.ObjectId(id);
};

utilityHelper.generateRandomToken = function(iteration) {
    var token = '';
    for (var i = 0; i < iteration; i++) {
        token = token + randChar();
    }
    return token;
};

utilityHelper.createDefaultPicture = function(userId) {
    var defaultPicPath = path.join(__dirname, '../public/', config.path.unknown_user);
    var picPath = path.join(__dirname, '../public/', config.path.users_pictures);
    var userPicPath = picPath + userId;
    return copy(defaultPicPath, userPicPath, {
        replace: false
    });
};

utilityHelper.createGroupDefaultPicture = function(groupId) {
    var defaultPicPath = path.join(__dirname, '../public/', config.path.unknown_group);
    var picPath = path.join(__dirname, '../public/', config.path.users_pictures);
    var userPicPath = picPath + groupId;
    return copy(defaultPicPath, userPicPath, {
        replace: false
    });
};

utilityHelper.dynamicSort = function(propName) {
    var sortOrder = 1;
    if(propName[0] === "-") {
        sortOrder = -1;
        propName = propName.substr(1);
    }
    return function (a,b) {
        var result = (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
        return result * sortOrder;
    };
};

String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

module.exports = utilityHelper;