const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	name: String,
	commentId: String,
	commentStar: String,
	comment: String
	
});

module.exports = commentSchema