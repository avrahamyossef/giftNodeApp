'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestsModel = new Schema({

    interests_id: { type: Number, required: true },
    interests_name: { type: String, required: true }

});

module.exports = mongoose.model('interests', interestsModel);