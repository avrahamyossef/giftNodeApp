
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.signup = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    },
        function (err, user) {
            if (err) {
                return res.status(500).send("There was a problem registering the user. err: " + err);
            }
            // create a token
            var token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
                currentUser: {
                    id: user._id,
                    userName: user.username,
                    email: user.email,
                }
            });
        });
};

exports.login = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {

        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!user) {
            return res.status(404).send({
                IsOk: false,
                errorMessage :'No user found.'
            });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                IsOk: false,
                token: null
            });
        }

        var token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            IsOk: true,
            token: token,
            currentUser: {
                id: user._id,
                userName: user.username,
                email: user.email,
            }
        });
    });
};