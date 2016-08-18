var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var bluebird = require('bluebird');
var renameAsync = bluebird.promisify(require('fs').rename);
var errorHelper = require('../helpers/error-helper.js');
var uploadHelper = require('../helpers/upload-helper.js');
var utilityHelper = require('../helpers/utility-helper.js');
var securityHelper = require('../helpers/security-helper.js');
var config = require('../config.js');

var storageImages = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/', config.path.users_pictures));
  },
  filename: function(req, file, cb) {
    cb(null, req.user.id + utilityHelper.generateUUID());
  }
});
var uploadImages = multer({
  storage: storageImages
}).single('picture');

var storageAttachments = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../', config.path.attachments));
  },
  filename: function(req, file, cb) {
    cb(null, req.user.id + utilityHelper.generateUUID());
  }
});
var uploadAttachments = multer({
  storage: storageAttachments
}).single('attachment');

router.put('/user-image', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
  uploadImages(req, res, function(err) {
    if (err)
      return next(errorHelper.forbiddenException(err.message));
    bluebird.try(function() {
      if (!req.file)
        throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
      var newPath = path.join(__dirname, '../public/', config.path.users_pictures, req.user.id);
      return renameAsync(req.file.path, newPath).return(newPath);
    }).then(function(path) {
      return uploadHelper.resize(path, 80, 80);
    }).then(function() {
      var response = {
        url: config.path.users_pictures + req.user.id
      };
      res.json(response);
    }).catch(function(err) {
      next(err);
    });
  });
});

router.put('/group-image', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
  uploadImages(req, res, function(err) {
    if (err)
      return next(errorHelper.forbiddenException(err.message));
    var groupId = req.body.groupId;
    bluebird.try(function() {
      if (!groupId || !req.file)
        throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
      var newPath = path.join(__dirname, '../public/', config.path.users_pictures, groupId);
      return renameAsync(req.file.path, newPath).return(newPath);
    }).then(function(path) {
      return uploadHelper.resize(path, 80, 80);
    }).then(function() {
      var response = {
        url: config.path.users_pictures + groupId
      };
      res.json(response);
    }).catch(function(err) {
      next(err);
    });
  });
});

router.put('/attachment', securityHelper.mustBeAuthenticated, securityHelper.mustBeValidated, function(req, res, next) {
  uploadAttachments(req, res, function(err) {
    if (err)
      return next(errorHelper.forbiddenException(err.message));
    var fileId = req.body.fileId;
    bluebird.try(function() {
      if (!fileId || !req.file)
        throw errorHelper.badRequestException('La richiesta non ha fornito tutti i parametri obbligatori');
      return uploadHelper.getMimeType(req.file.path);
    }).then(function(mime) {
      var response = {
        fileName: req.file.filename,
        originalFileName: req.file.originalname,
        fileId: fileId,
        mime: mime
      };
      res.json(response);
    }).catch(function(err) {
      next(err);
    });
  });
});


module.exports = router;