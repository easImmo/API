/**
 * Created by Nicolas on 3/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./room');

var propertySchema = new Schema({
    name: {type: String, required: true},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: true},
    zipCode: {type: Number, required: true},
    city: {type: String, required: true},
    user: {type:Schema.Types.ObjectId, ref:'User'},
    rooms: [Room.schema],
    created_at: Date,
    updated_at: Date
});

var Property = mongoose.model('Property',propertySchema);

module.exports = Property;