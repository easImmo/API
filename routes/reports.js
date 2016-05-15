/**
 * Created by Nicolas on 3/28/2016.
 */
var express = require('express');
var router = express.Router();
var Report = require('../models/report');
var Property = require('../models/property');
var Equipment = require('../models/equipment');
var Assessment = require('../models/assessment');
var _ = require('underscore');
var async = require('async');


/* GET reports listing. */
router.get('/', function(req, res) {
    // get all the reports
    Report.find({}, function(err, reprots) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            res.send(reprots);
        }
    });
});

router.get('/:report_id', function(req, res){
    var report_id = req.params.report_id;
    Property.findOne({'reports._id' : report_id }).lean().exec(function(err,property) {
        if(!property) {
            res.status(404);
            res.send();
        } else {
            var reportIndex = _.findIndex(property.reports, function(report) { return report._id == report_id });

            async.forEachOf(property.reports[reportIndex].assessments,function(assessment,index,callback){
                var equipmentId = assessment.equipment.toString();

                var room = _.find(property.rooms, function(room) { return  _.find(room.equipments, function(equipment) { return equipment._id == equipmentId }) });

                property.reports[reportIndex].assessments[index].equipment = _.find(room.equipments, function(equipment) { return equipment._id == equipmentId});
                callback();
            },function(err){
                if(err){console.log(err);}
                res.send(property.reports[reportIndex]);
            });


        }

    });
});

router.post('/', function(req, res) {
    data = req.body;
    var property_id = data.property_id;
    Property.findById(property_id, function(err,property) {
        if(!property) {
            res.status(404);
            res.send();
        } else {
            var report = new Report({
                comment : data.comment,
                type : data.type
        });
            property.reports.push(report);

            property.save(function(err) {
                if(err){
                    res.status(400);
                    res.send();
                } else {
                    res.send(report);
                }
            });
        }
    });

});

router.put('/', function (req,res) {
    data = req.body;
    var report_id = data.report_id;
    Property.findOne({'reports._id' : report_id }).lean().exec(function(err,property) {
        if(!property) {
            res.status(404);
            res.send();
        } else {
            var reportIndex = _.findIndex(property.reports, function(report) { return report._id == report_id });

            property.reports[reportIndex].comment = data.comment;

            res.send(property.reports[reportIndex]);
        }

    });
});

router.delete('/:report_id', function(req, res) {
    var report_id = req.params.report_id;
    Property.findOne({'reports._id' : report_id }, function(err,property) {
        if (!property) {
            res.status(404);
            res.send();
        } else {
            property.reports.id(report_id).remove();
            property.save(function (err) {
                if (err) res.sendStatus(500);
                else res.sendStatus(200);
            });
        }
    });
});


module.exports = router;