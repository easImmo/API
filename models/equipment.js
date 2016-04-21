/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentSchema = new Schema({
    room :  {type: Schema.Types.ObjectId, ref: 'room'},
    equipmentType : {type: Schema.Types.ObjectId, ref: 'equipmentType'}
});

var Equipment = mongoose.model('Equipment',equipmentSchema);

module.exports = Equipment;