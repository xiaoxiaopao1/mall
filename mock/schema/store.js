const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
	name: String,
	storeId: String,
	hasCounted: {type: Boolean,default: false},
	hasCommented: {type: Boolean,default: false}
})

module.exports = storeSchema