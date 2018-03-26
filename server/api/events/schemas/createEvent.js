'use strict';

const Joi = require('joi');

const createEventSchema = Joi.object({
  event_id: Joi.string().email().required(),
  event_name: Joi.string().required()
});


module.exports = createEventSchema;