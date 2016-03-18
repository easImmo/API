var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
  data = req.body;
  var user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });
   user.save(function(err) {
    if(err){
      res.status(400);
      res.send();
    } else {
      res.send(user);
    }
  });
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
