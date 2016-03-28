/**
 * Created by Nicolas on 3/28/2016.
 */
var express = require('express');
var router = express.Router();
var EquipmentState = require('../models/equipmentState');


/* GET equipment states listing. */
router.get('/', function(req, res) {
    // get all the equipment states
    EquipmentState.find({}, function(err, equipmentStates) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            console.log(equipmentStates);
            res.send(equipmentStates);
        }
    });
});

router.get('/:equipment_state_id', function(req, res){
    var equipment_state_id = req.params.equipment_state_id;
    EquipmentState.findById(equipment_state_id, function(err,equipmentState) {
        if (!equipmentState) {
            res.status(404);
            res.send();
        } else {
            res.send(equipmentState);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;

    var equipmentState = new EquipmentState({
        name: data.name
    });

    equipmentState.save(function(err) {
        if(err){
            res.status(400);
            res.send();
        } else {
            res.send(equipmentState);
        }
    });
});

router.delete('/:equipment_state_id', function(req, res) {
    var equipment_state_id = req.params.equipment_state_id;
    User.findById(equipment_state_id, function(err, equipmentState) {
        if(!equipmentState){
            res.status(404);
        } else {
            equipmentState.remove(function(err) {
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
