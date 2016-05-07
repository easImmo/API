/**
 * Created by Nicolas on 4/1/2016.
 */
var express = require('express');
var router = express.Router();
var Report = require('../models/report');
var Assessment = require('../models/assessment');
var EquipmentState = require('../models/equipmentState');

/* GET assessments listing. */
router.get('/', function(req, res) {
    // get all the assessments
    Assessment.find({}, function(err, assessments) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            res.send(assessments);
        }
    });
});

router.get('/:assessment_id', function(req, res){
    var assessment_id = req.params.assessment_id;
    Assessment.findById(assessment_id, function(err,assessment) {
        if (!assessment) {
            res.status(404);
            res.send();
        } else {
            res.send(assessment);
        }
    });
});

router.post('/', function(req, res) {
    data = req.body;
    var report_id = data.report_id;
    Report.findById(report_id, function(err,report) {
        if(!report) {
            console.log('report not found : '+report_id);
            res.status(404);
            res.send();
        } else {
             EquipmentState.findById(data.equipmentState, function(err,equipmentState) {
                if(!equipmentState) {
                    console.log('EquipmentState not found : '+data.equipmentState);
                    res.status(404);
                    res.send();
                } else {
                    var assessment = new Assessment({
                        
                        equipmentState : equipmentState
                    });
                    report.assessments.push(assessment);
                    report.save(function(err) {
                        if(err){
                            res.status(400);
                            res.send();
                        } else {
                            res.send(report);
                        }
                    });
                }
            });
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
