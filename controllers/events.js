// 1. Load the Person model
var Events = require('../models/events.js');


// 2. Get an individual evetn's public information
exports.list = function (req, res) {
    Events.find()
        .select('-password -__v')
        .exec(function (err, events) {
            if (err || events === null) {
                res.status(404).json({ error: 'events not found' });
            }
            else {
                res.json(events);
            }
        });
};
