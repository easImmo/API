/**
 * Created by Nicolas on 3/28/2016.
 */
var express = require('express');
var router = express.Router();
var Report = require('../models/report');
var Property = require('../models/property');

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
    Report.findById(report_id).exec(function(err, report) {
        if(!report) {
            res.status(404);
            res.send();
        } else {
            res.send(report);
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
                property:property
            });

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

});

router.delete('/:report_id', function(req, res) {
    var report_id = req.params.report_id;
    Report.findById(report_id, function(err, report) {
        if(!report){
            res.status(404);
        } else {
            report.remove(function(err) {
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