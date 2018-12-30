'use strict';
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var productModel = new Schema({

    ProductId: { type: Number, required: false },
    Name: { type: String, required: false },
    Description: { type: String, required: false },
    Price: { type: Number, required: false },
    Images: { type: Object, required: false },
    Intersts: { type: Object, required: false },
    Relationships: { type: Object, required: false },
    Events: { type: Object, required: false },
    Age: { type: Object, required: false },
    StoreId: { type: Number, required: false },
    CreatedDate: { type: Date, required: false },
    StoreLocationLng: {type: Number, required: false},
    StoreLocationLat: {type: Number, required: false},
    StoreAddress: {type: String, required: false},
    City: {type: String, required: false},
    Phone: {type: String, required: false},
    Distance: {type: String, required: false},
    LastModify: {type: Date, required:false}
});

module.exports = mongoose.model('product', productModel);