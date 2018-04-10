// 1. Load the Person model
var Interests = require('../models/interests.js');


// 2. Get an individual evetn's public information
exports.list = function (req, res) {
    Interests.find()
        .select('-password -__v')
        .exec(function (err, interests) {
            if (err || interests === null) {
                res.status(404).json({ error: 'interests not found' });
            }
            else {
                res.json(interests);
            }
        });
};
