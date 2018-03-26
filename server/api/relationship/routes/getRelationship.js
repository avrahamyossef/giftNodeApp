'use strict';
const Relationship = require('../model/relationship');
const Boom = require('boom');


module.exports = {
  method: 'GET',
  path: '/api/relationship',
  config: {
    handler: (req, res) => {
        Relationship
        .find()
        // Deselect the password and version fields
        .select('-password -__v')
        .exec((err, relationship) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!relationship.length) {
            throw Boom.notFound('No relationship found!');
          }
          res(relationship);
        })
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    // auth: {
    //   strategy: 'jwt'
    //   //scope: ['admin']
    // }
  }
}

