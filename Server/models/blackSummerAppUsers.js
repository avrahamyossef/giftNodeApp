'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    username: { type: String, required: false },
    phone: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: false },
    birthDay: { type: String, required: false },
    city: { type: String, required: false },
    gender: { type: String, required: false },
    createdDate: { type: Date, require: true}
});

module.exports = mongoose.model('blackSummerUsers', userModel);