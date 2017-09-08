const mongoose = require('mongoose');
const storeSchema = require('../schema/store');

const Store = mongoose.model('store',storeSchema);

module.exports = Store;