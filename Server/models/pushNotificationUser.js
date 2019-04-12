'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushNotificationUser = new Schema({

    details: { type: JSON, required: true },
    userId: { type: String, required: true}, //index: { unique: true } 
    createdDate: { type: Date, require: true }

});

module.exports = mongoose.model('pushNotificationUser', pushNotificationUser);