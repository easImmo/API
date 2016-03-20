/**
 * Created by Nicolas on 3/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    name: {type: String, required: true},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: true},
    zipCode: {type: Number, required: true},
    city: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});

var Property = mongoose.model('Property',propertySchema);

module.exports = Property;