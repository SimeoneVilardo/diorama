var uploadHelper = {};
var bluebird = require('bluebird');
var gm = require('gm');
bluebird.promisifyAll(gm.prototype);
var mmm = bluebird.promisifyAll(require("mmmagic"));
var Magic = mmm.Magic;

uploadHelper.resize = function(path, width, height) {
    return gm(path).scale(80, 80, '!').writeAsync(path);
};

uploadHelper.getMimeType = function (path) {
    var magic = new Magic(mmm.MAGIC_MIME_TYPE);
    return magic.detectFileAsync(path);
};

module.exports = uploadHelper;