/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Equipment = require('./equipment');
var Image = require('./image');

var roomSchema = new Schema({
    surface : {type: Number, required : true},
    roomType : {type: String, required : true},
    equipments : [Equipment.schema],
    image : Image.schema
});

var Room = mongoose.model('Room',roomSchema);

module.exports = Room;