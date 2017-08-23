const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	store: String
});

module.exports = userSchema;