'use strict';
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var productModel = new Schema({

    ProductId: { type: Number, required: true },
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
    Images: { type: Object, required: true },
    Intersts: { type: Object, required: true },
    Relationships: { type: Object, required: true },
    Events: { type: Object, required: true },
    Age: { type: Object, required: true },
    StoreId: { type: Number, required: true },
    CreatedDate: { type: Date, required: true },

});

module.exports = mongoose.model('product', productModel);