/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    surface: {type: Number, required : true},
    roomType : {type: Schema.Types.ObjectId, ref: 'roomType'}
});

var Room = mongoose.model('Room',roomSchema);

module.exports = Room;