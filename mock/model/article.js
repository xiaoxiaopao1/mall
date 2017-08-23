const mongoose = require('mongoose');
const articleSchema = require('../Schema/article');

const Article = mongoose.model('article',articleSchema);

module.exports = Article;