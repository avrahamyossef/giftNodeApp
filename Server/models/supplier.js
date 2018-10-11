'use strict';
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var supplierModel = new Schema({

    FullName: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true , index: { unique: true } },
    StoreName: { type: String, required: true },
    StoreId: { type: Number, required: false },
    Logo: { type: String, required: false },

});

module.exports = mongoose.model('supplier', supplierModel);