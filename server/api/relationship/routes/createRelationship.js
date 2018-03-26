'use strict';
const Relationship = require('../model/relationship');
const Boom = require('boom');
const createRelationship = require('../schemas/createRelationship');

module.exports = {
    method: 'POST',
    path: '/api/relationship',
    config: {
      handler: (req, res) => {
        let relationship = new Relationship();
        relationship.relationship_id = req.payload.relationship_id;
        relationship.relationship_name = req.payload.relationship_name;

        relationship.save((err, relationship) => {
            if (err) {
              throw Boom.badRequest(err);
            }
            // If the relationship is saved successfully
            res({ relationship: relationship }).code(201);
          });
      },
      // Validate the payload against the Joi schema
      validate: {
        payload: createRelationship
      }
    }  
  }