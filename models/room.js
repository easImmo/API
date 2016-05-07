/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Equipment = require('./equipment');

var roomSchema = new Schema({
    surface: {type: Number, required : true},
    roomType : {type: String, required : true},
    equipment : [Equipment.schema]
});

var Room = mongoose.model('Room',roomSchema);

module.exports = Room;