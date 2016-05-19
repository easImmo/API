/**
 * Created by Nicolas on 3/19/2016.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var Property = require('../models/property');
var RoomType = require('../models/roomType');
var User = require('../models/user');

/* GET properties listing. */
router.get('/', function(req, res) {
    // get all the properties
    Property.find({}, function(err, properties) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            res.send(properties);
        }
    });
});

router.get('/:property_id', function(req, res){
    var property_id = req.params.property_id;
    Property.findById(property_id, function(err, property) {
        if(!property) {
            res.status(404);
            res.send();
        } else {
            res.send(property);
        }

    });
});

router.get('/user/:user_id', function(req, res){
    var user_id = req.params.user_id;
    Property.find({'user':user_id}, function(err, properties) {
        if(!properties) {
            res.status(404);
            res.send();
        } else {
            res.send(properties);
        }

    });
});

router.post('/', function(req, res) {
    data = req.body;
    var user_id = data.user_id;
    User.findById(user_id, function(err,user) {
        if(!user) {
            res.status(404);
            res.send();
        } else {
            var property = new Property({
                name: data.name,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                zipCode: data.zipCode,
                city: data.city,
                user:user
            });

            property.save(function(err) {
                if(err){
                    res.status(400);
                    res.send();
                } else {
                    property.user = property.user._id;
                    res.send(property);
                }
            });
        }
    });

});

router.put('/', function (req,res) {
    data = req.body;
    var property_id = data.property_id;
    Property.findById(property_id,function(err,property) {
        if(!property) {
            res.status(404);
            res.send();
        } else {
            property.name = data.name;
            property.addressLine1 = data.addressLine1;
            property.addressLine2 = data.addressLine2;
            property.city = data.city;
            property.zipCode = data.zipCode;

            property.save(function (err) {
                if (err) {
                    res.status(500);
                    res.send();
                } else {
                    res.send(property);
                }
            })
        }
    });
});

router.delete('/:property_id', function(req, res) {
    var property_id = req.params.property_id;
    Property.findById(property_id, function(err, property) {
        if(!property){
            res.status(404);
        } else {
            property.remove(function(err) {
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