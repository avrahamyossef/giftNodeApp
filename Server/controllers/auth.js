
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var dnaUsersModel = require('../models/dnaUsersModel');
var blackSummerAppUsers = require("../models/blackSummerAppUsers");

//******************* regaloApp apis **********************/

exports.signup = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
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
    User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {

        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!user) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No user found.'
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

exports.checkIfUserExist = function (req, res) {

    User.findOne({ "email": req.body.email.toLowerCase() }).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                IsExist: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(200).send({
                IsOk: true,
                IsUserExist: false
            });
        }

        res.status(200).send({
            IsOk: true,
            IsUserExist: true
        });
    });
}

exports.signupProvider = function (req, res) {

    User.create({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
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

//******************* dna & blackFashion clubs apis **********************/

exports.signupForBlackSummer = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    blackSummerAppUsers.create({
        //password: hashedPassword,
        username: req.body.username,
        phone: req.body.phone,
        birthDay: req.body.birthDay,
        city: req.body.city,
        gender: req.body.gender,
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
                    username: user.username,
                    phone: user.phone,
                    birthDay: user.birthDay,
                    city: user.city,
                    gender: user.gender,
                }
            });
        });
};

exports.loginForBlackSummer = function (req, res) {
    blackSummerAppUsers.findOne({ phone: req.body.phone.toLowerCase() }, function (err, user) {

        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!user) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No user found.'
            });
        }

        // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        // if (!passwordIsValid) {
        //     return res.status(401).send({
        //         IsOk: false,
        //         token: null
        //     });
        // }

        var token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            IsOk: true,
            token: token,
            currentUser: user
        });
    });
};

exports.checkIfUserExistForBlackSummer = function (req, res) {

    blackSummerAppUsers.findOne({ "phone": req.body.phone }).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                IsExist: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(200).send({
                IsOk: true,
                IsUserExist: false
            });
        }

        res.status(200).send({
            IsOk: true,
            IsUserExist: true
        });
    });
}

//******************* dna & blackFashion clubs apis **********************/

exports.registerDnaUsers = function (req, res) {
    dnaUsersModel.create({
        fullName: req.body.fullName,
        city: req.body.city,
        phone: req.body.phone,
        numOfGames: req.body.numOfGames,
        answers: req.body.answers,
        timeSpent: req.body.timeSpent,

    },
        function (err, user) {
            if (err) {
                return res.status(500).send("There was a problem registering the user. err: " + err);
            }
            res.status(200).send({
                IsOk: true,
                Results: user
            });
        });
}

exports.updateUserResults = function (req, res) {
    dnaUsersModel.update({ _id: req.body._id }, {
        "numOfGames": req.body.numOfGames,
        "answers": req.body.answers,
        "timeSpent": req.body.timeSpent
    }).exec(function (err, response) {
        if (err) {
            return res.status(500).send({
                IsOk: false,
                errorMessage: 'Error on the server.'
            });
        }
        if (!response) {
            return res.status(404).send({
                IsOk: false,
                errorMessage: 'No user found.'
            });
        }
        res.status(200).send({
            IsOk: true,
            Results: response,
        });
    });
}

exports.getQuizResults = function (req, res) {
    dnaUsersModel.find()
        .select('-password -__v')
        .exec(function (err, users) {
            if (err || users === null) {
                res.status(404).json({
                    IsOk: false,
                    errorMessage: 'users not found',
                    error: err
                });
            }
            else {
                res.status(200).json({
                    IsOk: true,
                    Results: users,
                });
            }
        });
};
