
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
var blackSummerBusList = require("../models/blackSummerBusList");
var blackSummerTable = require("../models/blackSummerTable");
const webpush = require('web-push');
const vapidKeys = {
    publicKey: "BHSYFV2YGf2xMb7SUkVK2ec1nUo2694tYZtxMIzuYx6HzdIpHCtBCN5g0SZ82Pjsxu	VE1yolLyjjlGPJ29q1QUw",
    privateKey: "Dovo_1uvtOPen2jVdgf6GIMnY9nWKg7EqNy01IGGFvg"
};

webpush.setVapidDetails(
    'mailto:avrahamyossef3@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
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

//******************* blackSummer apis **********************/

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

exports.registerToBusRequest = function (req, res) {

    blackSummerBusList.create({
        station: req.body.station,
        city: req.body.city,
        manager: req.body.manager,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        createdDate: req.body.createdDate
    },
        function (err, results) {
            if (err) {
                return res.status(500).send("There was a problem registering the user. err: " + err);
            }
            res.status(200).send({
                IsOk: true,
                Results: results
            });
        });
};

exports.saveTableRequest = function (req, res) {

    blackSummerTable.create({
        date: req.body.date,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
    },
        function (err, results) {
            if (err) {
                return res.status(500).send("There was a problem registering the user. err: " + err);
            }
            res.status(200).send({
                IsOk: true,
                Results: results
            });
        });
};

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


/**************************** pwa push notification ***************************** */
exports.sendNewsletter = function(req, res) {

    const allSubscriptions = //... get subscriptions from database 
        [
            {
                "endpoint": "https://fcm.googleapis.com/fcm/send/eOAWWBcNibI:APA91bGBLjV85yqesfEboxXwlalMxauZaITtbkkBogxVJgqkApQ-UvMJup66aikqs5WTjWdC_IHQBw4tUHBsd9740DIbpW-W2ZIcMuq8s61orJCoMZPjXeiEvdS7aApNfTa1wpNcHZ0p",
                "expirationTime": null,
                "keys": {
                    "p256dh": "BCDXttN_Xuc-BgXxAZazvEf8lFfhtYEfZb9HfyTOkKcJA_HepN618tnn-qGoiy3bNFKc_nRs2ryj1ZTjRADQcNE",
                    "auth": "myJPSolxytzkPhVgpk-auQ"
                }
            }
        ];

    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        notification: {
            title: req.body.title,
            body: req.body.body,
            icon: "https://www.blacksummer.xyz/assets/images/logo.png",
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
                url: 'https://www.blacksummer.xyz'
            },
            actions: [{
                action: "explore",
                title: "כנס לאפליקציה"
            }]
        }
    };

    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
};