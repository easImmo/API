/**
 * Created by Nicolas on 3/31/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assessmentSchema = new Schema({
    equipment: {type:Schema.Types.ObjectId, ref:'Equipment'},
    equipmentState: {type:String},
    comment: {type: String}
},
    {
        timestamps: true
    });

var Assessment = mongoose.model('Assessment',assessmentSchema);

module.exports = Assessment;