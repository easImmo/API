/**
 * Created by Nicolas on 3/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentTypeSchema = new Schema({
    name: {type: String, required: true}
});

var EquipmentType = mongoose.model('EquipmentType',equipmentTypeSchema);

module.exports = EquipmentType;