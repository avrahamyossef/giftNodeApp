
// 1. Load the products model
var Products = require('../models/products.js');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var buildQueryForCreate = require('../utils').buildQueryForCreate;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


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
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        Images: req.body.Images,
        Intersts: buildQueryForCreate(req, "Intersts"),
        Relationships: buildQueryForCreate(req, "Relationships"),
        Events: buildQueryForCreate(req, "Events"),
        Age: buildQueryForCreate(req, "Age"),
        StoreName: req.body.StoreName,
        CreatedDate: new Date(),
        StoreLocationLng: req.body.StoreLocationLng,
        StoreLocationLat: req.body.StoreLocationLat,
        StoreAddress: req.body.StoreAddress,
        City: req.body.City,
        Phone: req.body.Phone,
        StoreHours: req.body.StoreHours

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

exports.updateProductImages = function (req, res) {
    Products.update({ _id: req.body.ProductId }, { "Images": req.body.Images} ).exec(function (err, response) {
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
