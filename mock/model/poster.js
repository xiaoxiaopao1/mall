const mongoose = require('mongoose');
const posterSchema = require('../schema/poster');

const Poster = mongoose.model('poster',posterSchema);

module.exports = Poster; 