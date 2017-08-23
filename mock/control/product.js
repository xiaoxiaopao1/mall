const mongoose = require('mongoose');
const Product = require('../model/product');



// 数据库查找产品数据的异步函数（产品列表和搜索都要使用）
const getAllProductData = () => {
	return new Promise((resolve,reject) => {
		Product.find().exec((err,data) => {
			resolve(data);
		})
	})
};

// 获取所有产品数据
const getAllProduct = async (ctx) => {
	const content = await getAllProductData();
	ctx.body = content;
};

// 获取搜索结果，并post回去
const findSearchProduct = async (ctx) => {
	const keyword = ctx.request.body.keyword;
	const keywords = keyword.split(' ');
	const allProduct = await getAllProductData();
	const result = allProduct.filter(item => {
		return keywords.some(iitem => {
			const re = new RegExp(iitem,'i');
			return re.test(item.title);
		})
	});
	ctx.body = {
		errno: 0,
		msg: 'success',
		data: result
	}
}

module.exports = { getAllProduct,findSearchProduct };