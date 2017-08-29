const mongoose = require('mongoose');
const Product = require('../model/product');



// 数据库查找产品数据的异步函数（产品列表和搜索都要使用）
// 此处使用sort进行了排序，即：新添加的产品在列表第一个
const getProductListData = (num,count) => {
	return new Promise((resolve,reject) => {
		Product.find({},null,{sort: {_id: -1}}).skip((num - 1) * count).limit(count).exec((err,data) => {
			resolve(data);
		})
	})
};


// 获取产品总数，计算产品页数
const getProductCountData = () => {
	return new Promise((resolve,reject) => {
		Product.find().count().exec((err,data) => {
			resolve(data);
		})
	})
}


// 获取单个产品信息
const getSingleProductData = (_id) => {
	return new Promise((resolve,reject) => {
		Product.find({_id: _id}).exec((err,data) => {
			resolve(data);
		})
	})
}

// 删除产品
const delProductData = (_id) => {
	return new Promise((resolve,reject) => {
		Product.remove({_id: _id}).exec((err,data) => {
			resolve();
		})
	})
}

// 更新产品
const updateProductData = (_id,title,alias,price) => {
	return new Promise((resolve,reject) => {
		Product.update({_id: _id},{$set: {title,alias,price}}).exec((err,data) => {
			resolve();
		})
	})
}

// 产品图信息判定
const aliasPic = (alias) => {
	const data = alias.split('.');
	if (data[0] >= 1 && data[0] <= 16 && data[1] == 'jpg') {
		return true;
	}else{
		return false;
	}
}

// 获取分页产品数据
const getProductList = async (ctx) => {
	const data = ctx.request.body;
	const content = await getProductListData(data.num,data.count);
	ctx.body = {
		errno: 0,
		msg: 'success',
		data: content
	};
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


// 后台添加产品信息
const addProduct = async (ctx) => {
	const data = ctx.request.body;
	if (aliasPic(data.alias)) {
		if (isNaN(data.price)) {
			ctx.body = {
				errno: 1,
				msg: 'success'
			}
		}else{
			const product = new Product(data);
			product.save();
			ctx.body = {
				errno: 0,
				msg: 'success'
			}
		}
	}else{
		ctx.body = {
			errno: 2,
			msg: 'success'
		}
	}
};

// 后台删除产品信息
const delProduct = async (ctx) => {
	const data = ctx.request.body;
	await delProductData(data._id);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

// 后台更新产品信息
const updateProduct = async (ctx) => {
	const data = ctx.request.body;
	if (aliasPic(data.alias)) {
		if (isNaN(data.price)) {
			ctx.body = {
				errno: 1,
				msg: 'success'
			}
		}else{
			await updateProductData(data._id,data.title,data.alias,data.price);
			ctx.body = {
				errno: 0,
				msg: 'success'
			}
		}
		
	}else{
		ctx.body = {
			errno: 2,
			msg: 'success'
		}
	}
	
}

// 后台将要更新的产品的原数据
const getSingleProduct = async (ctx) => {
	const data = ctx.request.body;
	const content = await getSingleProductData(data._id);
	ctx.body = {
		errno: 0,
		msg: 'success',
		data: content[0]
	}
}

// 获取产品总数量
const getProductCount = async (ctx) => {
	const count = await getProductCountData();
	ctx.body = count;
}

module.exports = { getProductCount,getProductList,findSearchProduct,addProduct,delProduct,updateProduct,getSingleProduct };