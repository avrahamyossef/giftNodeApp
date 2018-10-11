
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Supplier = require('../models/supplier');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


exports.signup = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Supplier.create({
        FullName: req.body.fullName,
        Email: req.body.email.toLowerCase(),
        Password: hashedPassword,
        StoreName: req.body.storeName,
        Logo: req.body.logo,

    },
        function (err, supplier) {
            if (err) {
                return res.status(500).send("There was a problem registering the supplier. err: " + err);
            }
            // create a token
            var token = jwt.sign({ id: supplier._id }, config.TOKEN_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
                currentSupplier: supplier
            });
        });
};

exports.login = function (req, res) {
    Supplier.findOne({ Email: req.body.email.toLowerCase() }, function (err, supplier) {

        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!supplier) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No supplier found.'
            });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, supplier.Password);
        if (!passwordIsValid) {
            return res.status(401).send({
                IsOk: false,
                token: null
            });
        }

        var token = jwt.sign({ id: supplier._id }, config.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            IsOk: true,
            token: token,
            currentSupplier: supplier
        });
    });
};

// exports.checkIfUserExist = function (req, res) {

//     Supplier.findOne({ "email": req.body.email.toLowerCase() }).exec(function (err, response) {
//         if (err) {
//             return res.status(500).send({
//                 IsOk: false,
//                 IsExist: false,
//                 errorMessage: 'Error on the server.'
//             });
//         }
//         if (!response) {
//             return res.status(200).send({
//                 IsOk: true,
//                 IsUserExist: false
//             });
//         }

//         res.status(200).send({
//             IsOk: true,
//             IsUserExist : true
//         });
//     });
// }
