/**
 * Created by Nicolas on 3/28/2016.
 */
/**
 * Created by Nicolas on 3/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentStateSchema = new Schema({
    name: {type: String, required: true}
});

var EquipmentState = mongoose.model('EquipmentState',equipmentStateSchema);

module.exports = EquipmentState;