/**
 * Created by Nicolas on 3/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
    property: {type:Schema.Types.ObjectId, ref:'Property'},
    created_at: Date,
    updated_at: Date
});

var Report = mongoose.model('Report',reportSchema);

module.exports = Report;