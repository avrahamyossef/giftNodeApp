'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busListModel = new Schema({
    city: { type: String, required: false },
    station: { type: String, required: false },
    manager: { type: String, required: false },
});

module.exports = mongoose.model('blackSummerBusList', busListModel);