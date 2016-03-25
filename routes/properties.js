/**
 * Created by Nicolas on 3/19/2016.
 */
var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var User = require('../models/user');

/* GET properties listing. */
router.get('/', function(req, res) {
    // get all the properties
    User.distinct('properties', function(err, properties) {
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
    User.distinct('properties', function(err, properties) {
        if (err) {
            res.status(500);
            res.send();
        } else {
            var property = properties.filter(function (prop) {
                return (prop._id == property_id);
            })[0];
            if(property.isUndefined()) {
                res.status(404);
                res.send();
            } else {
                res.send(properties);
            }
        }
    });
});

router.post('/:user_id', function(req, res) {
    var user_id = req.params.user_id;
    data = req.body;
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
                user:user,
            });

            property.save(function(err) {
                if(err){
                    res.status(400);
                    res.send();
                } else {
                    res.send(property);
                }
            });
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