const mongoose = require('mongoose');
const Product = require('../model/product');

const addProduct = async (ctx) => {
	const data = ctx.request.body;
	const product = new Product(data);
	product.save();
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
};

module.exports = {addProduct};