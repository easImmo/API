/**
 * Created by Nicolas on 3/25/2016.
 */
var express = require('express');
var router = express.Router();
var RoomType = require('../models/roomType');


/* GET room types listing. */
router.get('/', function(req, res) {
    // get all the room types
    RoomType.find({}, function(err, roomTypes) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            console.log(roomTypes);
            res.send(roomTypes);
        }
    });
});

router.get('/:room_type_id', function(req, res){
    var room_type_id = req.params.room_type_id;
    RoomType.findById(room_type_id, function(err,roomType) {
        if (!roomType) {
            res.status(404);
            res.send();
        } else {
            res.send(roomType);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;

    var roomType = new RoomType({
        name: data.name
    });

    roomType.save(function(err) {
        if(err){
            res.status(400);
            res.send();
        } else {
            res.send(roomType);
        }
    });
});

router.delete('/:room_type_id', function(req, res) {
    var room_type_id = req.params.room_type_id;
    User.findById(room_type_id, function(err, roomType) {
        if(!roomType){
            res.status(404);
        } else {
            roomType.remove(function(err) {
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
