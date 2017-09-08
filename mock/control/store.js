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

const getStoreList = async (ctx) => {
	const data = ctx.request.body;
	const content = await getStoreListData(data.name);

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
	}
	ctx.body = {
		errno: 0,
		msg: 'success',
		data: storeList
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



module.exports = {addToStore,getStoreList};