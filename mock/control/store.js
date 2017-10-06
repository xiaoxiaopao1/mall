const Store = require('../model/store');
const Product = require('../model/product');

const getStoreListData = (name) => {
	return new Promise((resolve,reject) => {
		Store.find({name: name},null,{sort: {_id: -1}}).exec((err,data) =>{
			resolve(data);
		})
	})
};

const getProductData = (_id) => {
	return new Promise((resolve,reject) => {
		Product.findOne({_id: _id}).exec((err,data) => {
			resolve(data);
		})
	})
}

const countToStoreData = (name,_id) => {
	return new Promise((resolve,reject) => {
		Store.update({name: name, _id: _id},{$set: {hasCounted: true}}).exec((err,data) => {
			resolve();
		})
	})
}

const delToStoreData = (name,_id) => {
	return new Promise((resolve,reject) => {
		Store.remove({name: name, _id: _id}).exec((err,data) => {
			resolve();
		})
	})
}

const getStoreList = async (ctx) => {
	const data = ctx.request.body;
	const content = await getStoreListData(data.name);
	console.log(content);

	// 此处使用map会存在问题，返回值为Promise，原因在于相当于then里面套then函数
	// const storeList =  content.map(async (item) => {
	// 	const singleStore = await getProductData(item.storeId);
	// 	return singleStore;
	// });
	// const storeList = await getProductData(content[0].storeId);
	// console.log(storeList);
	const storeList = new Array();
	for(let i = 0; i < content.length; i++){
		storeList[i] = await getProductData(content[i].storeId);
		storeList[i].storeId = content[i]._id;
		storeList[i].hasCounted = content[i].hasCounted;
		storeList[i].hasCommented = content[i].hasCommented;
	}
	// 产品下架问题，即后台删除了，可是购物车里还存在
	const newStoreList = storeList.filter((item) => {
		return item;
	})
	const storeData = newStoreList.map(item => {
		return {storeId: item.storeId,
				hasCounted: item.hasCounted,
				hasCommented: item.hasCommented};
	});

	ctx.body = {
		errno: 0,
		msg: 'success',
		data: newStoreList,
		storeData
	}
}



const addToStore = async (ctx) => {
	const data = ctx.request.body;
	const store = new Store(data);
	store.save();
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

const countToStore = async (ctx) => {
	const data = ctx.request.body;
	await countToStoreData(data.name,data._id);
	console.log(data);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

const delToStore = async (ctx) => {
	const data = ctx.request.body;
	const result = await delToStoreData(data.name,data._id);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}



module.exports = {addToStore,countToStore,delToStore,getStoreList};