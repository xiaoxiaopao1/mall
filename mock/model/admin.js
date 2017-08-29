const mongoose = require('mongoose');
const adminSchema = require('../schema/admin');

const Admin = mongoose.model('admin',adminSchema);

module.exports = Admin;