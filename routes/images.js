/**
 * Created by Nicolas on 3/28/2016.
 */

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
var Image = require('../models/image');



router.post('/', upload.single('image'), function (req, res, next) {
    var image = new Image({
        name : req.file.originalname,
        filename : req.file.filename
    });
    image.save(function(err) {
        if(err){
            res.status(400);
            res.send();
        } else {
            res.send(image);
        }
    });
});



module.exports = router;