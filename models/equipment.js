/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentSchema = new Schema({
    equipmentType : {type: String, required : true}
});

var Equipment = mongoose.model('Equipment',equipmentSchema);

module.exports = Equipment;