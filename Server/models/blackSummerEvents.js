'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventsModel = new Schema({
    orderId: { type: Number, required: false },
    name: { type: String, required: false },
    date: { type: Date, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false },
    video: { type: String, required: false },
    isClose: { type: Boolean, required: false },
    isSpecial: { type: Boolean, required: false }
});

module.exports = mongoose.model('BlackSummer_Events', EventsModel);