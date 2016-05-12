/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    filename : {type: String, required : true},
    name : {type: String, required : true}
});

var Image = mongoose.model('Image',imageSchema);

module.exports = Image;