'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutesModel = new Schema({
    name: { type: String, required: false },
    peopleCount: { type: Number, required: false },
    groupName: { type: String, required: false }
});

module.exports = mongoose.model('BlackSummer_Routes', RoutesModel);