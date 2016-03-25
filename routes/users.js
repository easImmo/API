var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/* GET users listing. */
router.get('/', function(req, res) {
  // get all the users
  User.find({}, function(err, users) {
    if (err) {
      res.status(500);
      res.send();
    } else {
        res.send(users);
    }
  });
});

router.get('/:user_id', function(req, res){
  var user_id = req.params.user_id;
  User.findById(user_id, function(err,user) {
    if (!user) {
      res.status(404);
      res.send();
    } else {
      res.send(user);
    }
  });
});

router.post('/', function(req, res) {
  console.log('first');
  data = req.body;
  User.register(new User({
    email: data.email
    /*firstName: data.firstName,
    lastName: data.lastName,
    */
  }), data.password, function(err, user) {
    console.log('register');
    if(err){
      res.status(400);
      res.send(err);
    } else {
      res.send(user);
    }
  });
  console.log('lel');
});

router.delete('/:user_id', function(req, res) {
  var user_id = req.params.user_id;
  User.findById(user_id, function(err, user) {
    if(!user){
      res.status(404);
    } else {
      user.remove(function(err) {
        if(err){
          res.status(500);
        } else {
          res.status(201);
        }
      });
    }
    res.send();
  });

});




module.exports = router;
