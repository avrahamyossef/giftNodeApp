
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
        return res.status(401).send({
            IsOk: false,
            errorMessage: "TokenInvalid",
            error: err
        });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({
            IsOk: false,
            errorMessage: 'TokenExpired',
            error: err
        });
    }

    // if everything is good, save to request for use in other routes
    req.decoded = payload;
    next();

};


exports.buildQueryForCreate = function (req, param) {
    var _dataIds = [];
    //build query for search by param - return array of ids
    if (req.body[param] !== null && req.body[param] !== undefined && req.body[param] !== "" && req.body[param]) {
        _dataIds = JSON.parse("[" + req.body[param] + "]");
    }
    return _dataIds;
}
