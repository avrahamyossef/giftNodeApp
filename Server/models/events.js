'use strict';
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var eventModel = new Schema({

    event_id: { type: Number, required: true },
    event_name: { type: String, required: true }

});

module.exports = mongoose.model('events', eventModel);