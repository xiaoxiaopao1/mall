const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
	title: String
})

module.exports = posterSchema;