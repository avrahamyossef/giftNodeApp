'use strict';
const Interests = require('../model/interests');
const Boom = require('boom');


module.exports = {
  method: 'GET',
  path: '/api/interests',
  config: {
    handler: (req, res) => {
        Interests
        .find()
        // Deselect the password and version fields
        .select('-password -__v')
        .exec((err, interests) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!interests.length) {
            throw Boom.notFound('No interests found!');
          }
          res(interests);
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