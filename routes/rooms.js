/**
 * Created by Nicolas on 3/25/2016.
 */
var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Room = require('../models/room');
var RoomType = require('../models/roomType');

/* GET rooms listing. */
router.get('/', function(req, res) {
    // get all the rooms
    Room.find({}, function(err, rooms) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            res.send(rooms);
        }
    });
});

router.get('/:room_id', function(req, res){
    var room_id = req.params.room_id;
    Room.findById(room_id, function(err,room) {
        if (!room) {
            res.status(404);
            res.send();
        } else {
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
            RoomType.findById(data.roomType, function(err,roomType) {
                if(!roomType) {
                    console.log('roomtype not found : '+data.roomType);
                    res.status(404);
                    res.send();
                } else {
                    var room = new Room({
                        surface : data.surface,
                        roomType : roomType
                    });
                    property.rooms.push(room);
                    property.save(function(err) {
                        if(err){
                            res.status(400);
                            res.send();
                        } else {
                            res.send(property);
                        }
                    });
                }
            });
        }
    });
});

router.delete('/:room_id', function(req, res) {
    var room_id = req.params.room_id;
    User.findById(room_id, function(err, room) {
        if(!room){
            res.status(404);
        } else {
            room.remove(function(err) {
                if(err){
                    res.status(500);
                } else {
                    res.status(201);
                }
            });
        }
        res.send();
    });

});




module.exports = router;
