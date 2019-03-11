'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busListModel = new Schema({
    city: { type: String, required: false },
    station: { type: String, required: false },
    manager: { type: String, required: false },
    userName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    createdDate: { type:  Date, required: false }
});

module.exports = mongoose.model('blackSummerBusList', busListModel);