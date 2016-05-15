/**
 * Created by Nicolas on 3/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Assessment = require('./assessment');

var reportSchema = new Schema({
    assessments : [Assessment.schema],
    comment : String,
    type: {type: String, enum: ['ENTRY', 'EXIT']}
},
    {
        timestamps: true
    });

var Report = mongoose.model('Report',reportSchema);

module.exports = Report;