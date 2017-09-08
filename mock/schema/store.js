const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
	name: String,
	storeId: String
})

module.exports = storeSchema