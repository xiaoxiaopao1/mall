const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: String,
	content: String
})

module.exports = articleSchema; 