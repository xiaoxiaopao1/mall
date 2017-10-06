const mongoose = require('mongoose');
const commentSchema = require('../schema/comment');

const Comment = mongoose.model('comment',commentSchema);

module.exports = Comment;