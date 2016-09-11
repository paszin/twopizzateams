'use strict';
var _ = require('lodash');
var traitify = require('traitify');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

traitify.setHost("https://api.traitify.com");
traitify.setVersion("v1");
traitify.setSecretKey(process.env.TRAITIFY_SECRET);

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  //create an assessment
  var deckId = "career-deck";
  console.log("create assessment");
//   try {
//   traitify.createAssessment(deckId, function(assessment){
//     // Use assessment here.
//     console.log("created assessment");
//     console.log(assessment);
//     newUser.assessmentId = assessment.id;
//     newUser.save(function(err, user) {
//       if (err) return validationError(res, err);
//       var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
//       res.json({ token: token });
//     });
//   });
// } catch(err) {
//   console.log("use default assessid, because");
//   console.log(err);
//   newUser.assessmentId = "01b5f931-acdf-4254-97eb-81a127777595";
//   newUser.save(function(err, user) {
//     if (err) return validationError(res, err);
//     var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
//     res.json({ token: token });
//   });
// }
newUser.assessmentId = "85b5b3d3-fd77-4ca1-bcbc-61c39184e72f" || "cafcab6f-c4db-4780-87d1-12d848efbca7"; 
newUser.save(function(err, user) {
  if (err) return validationError(res, err);
  var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
  res.json({ token: token });
});

};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};



/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
