'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationshipModel = new Schema({

    relationship_id: { type: Number, required: true },
    relationship_name: { type: String, required: true }

});

module.exports = mongoose.model('relationship', relationshipModel);