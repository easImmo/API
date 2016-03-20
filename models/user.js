/**
 * Created by Nicolas on 3/17/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('./property');
passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    admin : Boolean,
    properties: [Property.schema]
},
    {
        timestamps: true
    });

userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});

var User = mongoose.model('User',userSchema);

module.exports = User;
