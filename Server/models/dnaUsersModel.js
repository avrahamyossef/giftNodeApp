'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dnaUsersModel = new Schema({

    fullName: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true, index: { unique: true } },
    numOfGames: { type: Number, required: true },
    answers: { type: Number, required: true },
    timeSpent: { type: String, required: true }
});

module.exports = mongoose.model('dna_users_tow', dnaUsersModel);