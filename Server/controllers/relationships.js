
// 1. Load the Person model
var Relationship = require('../models/relationships.js');


// 2. Get an individual Person's public information
exports.list = function (req, res) {
    Relationship.find()
        .select('-password -__v')
        .exec(function (err, relationships) {
            if (err || relationships === null) {
                res.status(404).json({
                    IsOk: false,
                    errorMessage: 'relationships not found',
                    error: err
                });
            }
            else {
                res.status(200).json({
                    IsOk: true,
                    Results: relationships
                });
            }
        });
};
