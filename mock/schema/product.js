const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: String,
	alias: String,
	price: Number
})

module.exports = productSchema;