/**
 * Created by Nicolas on 3/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./room');
var Report = require('./report');
var Image = require('./image');

var propertySchema = new Schema({
    name: {type: String, required: true},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String},
    zipCode: {type: Number, required: true},
    city: {type: String, required: true},
    user: {type:Schema.Types.ObjectId, ref:'User'},
    image : Image.schema,
    rooms: [Room.schema],
    reports: [Report.schema]
},
    {
        timestamps: true
    });

var Property = mongoose.model('Property',propertySchema);

module.exports = Property;