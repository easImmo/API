/**
 * Created by Nicolas on 3/17/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin : Boolean,
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User',userSchema);

module.exports = User;