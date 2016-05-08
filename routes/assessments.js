/**
 * Created by Nicolas on 4/1/2016.
 */
var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Assessment = require('../models/assessment');
var Equipment = require('../models/equipment');
var _ = require('underscore');


router.post('/', function(req, res) {
    data = req.body;
    var report_id = data.report_id;
    Property.findOne({'reports._id' : report_id }, function(err,property) {
        if(!property) {
            console.log('report not found : '+report_id);
            res.status(404);
            res.send();
        } else {
            var room = _.find(property.rooms, function(room) { return  _.find(room.equipments, function(equipment) { return equipment.id == data.equipment_id }) });
            var equipment =  _.find(room.equipments, function(equipment) { return equipment.id == data.equipment_id });
            if(!equipment){
                res.sendStatus(404);
            } else {
                var assessment = new Assessment({
                    equipment : equipment,
                    equipmentState : data.equipmentState
                });
                var report =  _.find(property.reports, function(report) { return report.id == report_id });

                property.reports.id(report._id).assessments.push(assessment);
                property.save(function(err) {
                    if(err){
                        res.status(400);
                        res.send();
                    } else {
                        res.send(assessment);
                    }
                })
            }
        }
    });
});

router.delete('/:assessment_id', function(req, res) {
    var assessment_id = req.params.assessment_id;
    User.findById(assessment_id, function(err, assessment) {
        if(!assessment){
            res.status(404);
        } else {
            assessment.remove(function(err) {
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
