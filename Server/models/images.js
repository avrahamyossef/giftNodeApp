'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesModel = new Schema({

    supplierId: { type: String, required: true },
    supplierName: { type: String, required: false },
    productId: { type: String, required: false },
    imagesSrc: { type: Array, required: false }

});

module.exports = mongoose.model('images', imagesModel);