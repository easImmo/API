/**
 * Created by Nicolas on 3/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Assessment = require('./assessment');

var reportSchema = new Schema({
    property: {type:Schema.Types.ObjectId, ref:'Property'},
    assessments : [Assessment.schema],
    created_at: Date,
    updated_at: Date
});

var Report = mongoose.model('Report',reportSchema);

module.exports = Report;