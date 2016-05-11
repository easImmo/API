/**
 * Created by Nicolas on 5/8/2016.
 */
var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Room = require('../models/room');
var Equipment = require('../models/equipment');
var _ = require('underscore');


router.get('/:equipment_id', function(req, res){
    var equipment_id = req.params.equipment_id;
    Property.findOne({'rooms.equipments._id' : equipment_id }, function(err,property) {
        if (!property) {
            res.status(404);
            res.send();
        } else {
            var room =  _.find(property.rooms, function(room) { _.find(room.equipments, function(equipment) { return equipment.id == equipment_id })});
            var equipment = _.find(room.equipments, function(equipment) { return equipment.id == equipment_id});
            res.status(200);
            res.send(equipment);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;
    var room_id = data.room_id;
    Property.findOne({'rooms._id' : room_id }, function(err,property) {
        if(!property) {
            console.log('property not found');
            res.status(404);
            res.send();
        } else {
            var room =  _.find(property.rooms, function(room) { return room.id == room_id });

            console.log(data.equipmentType);
            var equipment = new Equipment({
                equipmentType: data.equipmentType
            });

            property.rooms.id(room._id).equipments.push(equipment);
            property.save(function(err) {
                if(err){
                    res.status(400);
                    res.send();
                } else {
                    res.send(equipment);
                }
            });
        }
    });
});

router.delete('/:equipment_id', function(req, res) {
    var equipment_id = req.params.equipment_id;
    Property.findOne({'rooms.equipments._id' : equipment_id }, function(err,property) {
        if (!property) {
            res.status(404);
            res.send();
        } else {
            var room =  _.find(property.rooms, function(room) { return _.find(room.equipments, function(equipment) { return equipment.id == equipment_id })});
            property.rooms.id(room._id).equipments.pull({ _id: equipment_id });
            property.save(function (err) {
                if (err) res.sendStatus(500);
                else res.sendStatus(200);
            });
        }
    });
});




module.exports = router;
