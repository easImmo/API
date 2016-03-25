/**
 * Created by Nicolas on 3/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomTypeSchema = new Schema({
    name: {type: String, required: true}
});

var RoomType = mongoose.model('RoomType',roomTypeSchema);

module.exports = RoomType;