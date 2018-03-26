'use strict';

const Joi = require('joi');

const createRelationship = Joi.object({

    relationship_id: Joi.number().required(),
    relationship_name: Joi.string().required()

});


module.exports = createRelationship;
