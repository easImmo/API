/**
 * Created by Nicolas on 3/25/2016.
 */
var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Property = require('../models/property');
var RoomType = require('../models/roomType');
var _ = require('underscore');


router.get('/:room_id', function(req, res){
    var room_id = req.params.room_id;
    Property.findOne({'rooms._id' : room_id }, function(err,property) {
        if (!property) {
            res.status(404);
            res.send();
        } else {
            var room =  _.find(property.rooms, function(room) { return room.id == room_id });
            res.status(200);
            res.send(room);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;
    var property_id = data.property_id;
    Property.findById(property_id, function(err,property) {
        if(!property) {
            console.log('property not found : '+property_id);
            res.status(404);
            res.send();
        } else {
            var room = new Room({
                surface : data.surface,
                roomType : data.roomType
            });
            property.rooms.push(room);
            property.save(function(err) {
                if(err){
                    res.status(400);
                    res.send();
                } else {
                    res.send(room);
                }
            });
        }
    });
});

router.delete('/:room_id', function(req, res) {
    var room_id = req.params.room_id;
    Property.findOne({'rooms._id' : room_id }, function(err,property) {
        if (!property) {
            res.status(404);
            res.send();
        } else {
            property.rooms.id(room_id).remove();
            property.save(function (err) {
                if (err) res.sendStatus(500);
                else res.sendStatus(200);
            });
        }
    });
});




module.exports = router;
