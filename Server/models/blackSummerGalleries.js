'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GalleryModel = new Schema({
    orderId: { type: Number, required: false },
    src: { type: String, required: false },
});

module.exports = mongoose.model('BlackSummer_Galleries', GalleryModel);