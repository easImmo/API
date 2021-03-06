var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');




var users = require('./routes/users');
var properties = require('./routes/properties');
var rooms = require('./routes/rooms');
var roomTypes = require('./routes/roomTypes');
var reports = require('./routes/reports');
var equipments = require('./routes/equipments');
var equipmentTypes = require('./routes/equipmentTypes');
var equipmentStates = require('./routes/equipmentStates');
var routes = require('./routes/index');
var images = require('./routes/images');
var assessments = require('./routes/assessments');

var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/easImmo');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/properties',properties);
app.use('/rooms',rooms);
app.use('/roomTypes',roomTypes);
app.use('/equipments',equipments);
app.use('/equipmentTypes',equipmentTypes);
app.use('/equipmentStates',equipmentStates);
app.use('/reports',reports);
app.use('/images',images);
app.use('/assessments',assessments);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



// passport config
var User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;
