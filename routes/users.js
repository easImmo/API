var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');
var config = require('../env.json');


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

router.get('/mail', function (req,res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.pass
    }
  });

  var mailOptions = {
    from: '', // sender address
    to: 'nducom@gmail.com', // list of receivers
    subject: 'logement', // Subject line
    html: '<b>Hello world ✔</b><br/><img src="http://placekitten.com/200/300">' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.json({yo: 'error'});
    }else{
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    }
  });
});

router.post('/login',
    passport.authenticate('local',{ session: false }),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.status(200);
      res.json({ _id: req.user.id, username: req.user.email });
    });

router.get('/:user_id', function(req, res) {
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
