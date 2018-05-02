// 1. Load the events model
var Events = require('../models/events.js');


// 2. Get an individual evetn's public information
exports.list = function (req, res) {
    Events.find()
        .select('-password -__v')
        .exec(function (err, events) {
            if (err || events === null) {
                res.status(404).json({
                    IsOk: false,
                    errorMessage: 'events not found',
                    error: err
                });
            }
            else {
                res.status(200).json({
                    IsOk: true,
                    Results: events,
                });
            }
        });
};
