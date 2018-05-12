
// 1. Load the products model
var Products = require('../models/products.js');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 2. Get an individual products's public information
// exports.getList = function (req, res) {
//     // Products.findOne({ 
//     //     age: req.body.age, 
//     //     relationship: req.body.relationship, 

//     // }, function (err, response) {
//         Products.find(
//             { "Age" : [ req.body.age ] },
//             { "Relationships" :[ req.body.relationship] },
//         ), function(){
//         if (err) {
//             return res.status(500).send({
//                 IsOk: false,
//                 errorMessage: 'Error on the server.'
//             });
//         }
//         if (!response) {
//             return res.status(404).send({
//                 IsOk: false,
//                 errorMessage :'No products found.'
//             });
//         }

//         res.status(200).send({
//             IsOk: true,
//             Results: response,
//         });
//     };
// };


// 2. Get an individual evetn's public information
exports.getList = function (req, res) {


    var query = { 
        Events: buildQuerySearch(req, "eventIds"), 
        Age : buildQuerySearch(req, "ageIds"), 
        Intersts: buildQuerySearch (req, "interestsIds"), 
        Relationships: buildQuerySearch (req,"relationshipsIds")  
    };

    Products.find(query).exec(function (err, products) {
            if (err || products === null) {
                res.status(404).json({
                    IsOk: false,
                    errorMessage: 'products not found',
                    error: err
                });
            }
            else {
                res.status(200).json({
                    IsOk: true,
                    Results: products,
                });
            }
        });
};

buildQuerySearch = function (req, param) {
    var _dataIds = [];
    console.log("buildQuerySearch start req: " + req.body[param]);
    //build query for search by param - return array of ids
    if (req.body[param] !== null && req.body[param] !== undefined && req.body[param] !== "" && req.body[param]) {
        _dataIds = JSON.parse("[" + req.body[param] + "]");
    }
    else{
        return _dataIds = { $exists: true };
    }
    return _dataIds;
}
