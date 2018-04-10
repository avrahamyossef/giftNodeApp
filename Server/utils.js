
var config = require('./config');
var moment = require('moment');
var jwt = require('jwt-simple');


exports.ensureAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'TokenMissing' });
    }
    var token = req.headers.authorization.split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ error: "TokenInvalid" });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ error: 'TokenExpired' });
    }

    // if everything is good, save to request for use in other routes
    req.decoded = payload;
    next();

};
