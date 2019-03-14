'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushNotificationUser = new Schema({

    details: { type: JSON, required: true },
    id: { type: String, required: true, index: { unique: true } },

});

module.exports = mongoose.model('pushNotificationUser', pushNotificationUser);