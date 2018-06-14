
// 1. Load the products model
var Products = require('../models/products.js');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// 2. Get an individual evetn's public information
exports.getList = function (req, res) {
    var query = {
        Events: buildQuerySearch(req, "eventIds"),
        Age: buildQuerySearch(req, "ageIds"),
        Intersts: buildQuerySearch(req, "interestsIds"),
        Relationships: buildQuerySearch(req, "relationshipsIds"),
        Price: buildQuerySearch(req, "price")
    };

    Products.find(query).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No products found.'
            });
        }

        res.status(200).send({
            IsOk: true,
            Results: response,
        });
    });
};



exports.getProductById = function (req, res) {

    Products.findOne({ "_id": req.body.Id }).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No product found.'
            });
        }

        res.status(200).send({
            IsOk: true,
            Results: response,
        });
    });
}
exports.create = function (req, res) {

    Products.create({
        //ProductId: getNextSequenceValue("ProductId"),
        Name: req.body.name,
        Description: req.body.description,
        Price: req.body.price,
        Images: req.body.images,
        Intersts: req.body.intersts,
        Relationships: req.body.relationships,
        Events: req.body.events,
        Age: req.body.age,
        StoreName: req.body.storeName,
        CreatedDate: new Date(),
        StoreLocationLng: req.body.storeLocationLng,
        StoreLocationLat: req.body.storeLocationLat,
        StoreAddress: req.body.storeAddress,
        City: req.body.city,
        Phone: req.body.phone,
        StoreHours: req.body.storeHours

    }, function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'Error on save products.'
            });
        }

        res.status(200).send({
            IsOk: true,
            Results: response,
        });
    });
}

//build query for search param in mongo DB
buildQuerySearch = function (req, param) {

    if (param === "price") {
        var _priceQuery = "";
        if (req.body[param] !== null && req.body[param] !== undefined && req.body[param] !== "" && req.body[param]) {

            if (req.body[param] === 1000) {
                return param = { $gt: parseInt(req.body[param]), $lt: 10000 };

            } else {
                return param = { $gt: 0, $lt: parseInt(req.body[param]) };
            }
        }
        else {
            return param = { $exists: true };
        }
    }
    else {
        var _dataIds = [];
        console.log("buildQuerySearch start req: " + req.body[param]);
        //build query for search by param - return array of ids
        if (req.body[param] !== null && req.body[param] !== undefined && req.body[param] !== "" && req.body[param]) {
            _dataIds = JSON.parse("[" + req.body[param] + "]");
        }
        else {
            return _dataIds = { $exists: true };
        }
        return _dataIds;
    }
}

// get Next Sequence Value of product id
// function getNextSequenceValue(sequenceName) {
//     debugger;
//     var sequenceDocument =  mongoose.connections[0].collections.products.findAndModify({
//         query: { _id: sequenceName },
//         update: { $inc: { sequence_value: 1 } },
//         new: true
//     });

//     return sequenceDocument.sequence_value;
// }
