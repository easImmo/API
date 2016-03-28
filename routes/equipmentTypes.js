/**
 * Created by Nicolas on 3/28/2016.
 */
var express = require('express');
var router = express.Router();
var EquipmentType = require('../models/equipmentType');


/* GET equipment types listing. */
router.get('/', function(req, res) {
    // get all the equipment types
    EquipmentType.find({}, function(err, equipmentTypes) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            console.log(equipmentTypes);
            res.send(equipmentTypes);
        }
    });
});

router.get('/:equipment_type_id', function(req, res){
    var equipment_type_id = req.params.equipment_type_id;
    EquipmentType.findById(equipment_type_id, function(err,equipmentType) {
        if (!equipmentType) {
            res.status(404);
            res.send();
        } else {
            res.send(equipmentType);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;

    var equipmentType = new EquipmentType({
        name: data.name
    });

    equipmentType.save(function(err) {
        if(err){
            res.status(400);
            res.send();
        } else {
            res.send(equipmentType);
        }
    });
});

router.delete('/:equipment_type_id', function(req, res) {
    var equipment_type_id = req.params.equipment_type_id;
    User.findById(equipment_type_id, function(err, equipmentType) {
        if(!equipmentType){
            res.status(404);
        } else {
            equipmentType.remove(function(err) {
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
