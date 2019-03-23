'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableModel = new Schema({
    date: { type: String, required: false },
    fullName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    createdDate: { type: Date, require: true}
});

module.exports = mongoose.model('blackSummerTable', tableModel);