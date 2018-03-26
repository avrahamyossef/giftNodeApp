'use strict';
const Event = require('../model/event');
const Boom = require('boom');
module.exports = {
  method: 'GET',
  path: '/api/events',
  config: {
    handler: (req, res) => {
        Event
        .find()
        // Deselect the password and version fields
        .select('-password -__v')
        .exec((err, events) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!events.length) {
            throw Boom.notFound('No events found!');
          }
          res(events);
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