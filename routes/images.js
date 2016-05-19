/**
 * Created by Nicolas on 3/28/2016.
 */

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var Image = require('../models/image');
var fs = require('fs-extra');
var path = require('path');
var Assessment = require('../models/assessment');
var Property = require('../models/property');



router.post('/', upload.single('image'), function (req, res, next) {
    console.log(req);
    var assessment_id = req.body.assessment_id;
    var image = new Image({
        name : req.file.originalname,
        filename : req.file.filename
    });

    image.save(function(err) {
        if(err){
            res.status(400);
            res.send();
        } else {
            if(assessment_id) {
                Property.findOne({'reports.assessments._id' : assessment_id }, function(err,property) {
                    if(!property) {
                        console.log('assessment not found : '+assessment_id);
                        res.status(404);
                        res.send();
                    } else {
                            var report =  _.find(property.reports, function(report) { return _.find(report.assessments, function(assessment) { return assessment.id = assessment_id }) });
                            var assessment = _.find(report.assessments, function(assessment) { return assessment.id = assessment_id });
                            property.reports.id(report._id).assessments.id(assessment.id).images.push(image);
                            property.save(function(err) {
                                if(err){
                                    res.status(400);
                                    res.send();
                                } else {
                                    res.send(image);
                                }
                            })
                        }
                });
            }
        }
    });
});

router.get('/:image_id', function (req, res) {
    var image_id = req.params.image_id;
    Image.findById(image_id, function(err, image) {
        if(!image) {
            res.status(404);
            res.send();
        } else {
            fs.copySync('uploads/'+image.filename,'tmpDl/'+image.name);
            res.sendFile(path.resolve('tmpDl/'+image.name), function() {
                fs.removeSync(path.resolve('tmpDl/'+image.name));
            });
        }

    });
});



module.exports = router;