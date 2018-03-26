'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventModel = new Schema({

    event_id: { type: Number, required: true },
    event_name: { type: String, required: true }

});

module.exports = mongoose.model('events', eventModel);