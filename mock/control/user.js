const User = require('../model/user'); 

const getUserData = (arg={}) => {
	return new Promise((resolve,reject) => {
		User.find(arg).exec((err,data) => {
			resolve(data);
		})
	})
}

// 用户登录
const getUser = async (ctx) => {
	
	const content = await getUserData();
	ctx.body = content;
}

// 用户注册
const postUser = async (ctx) => {
	const data = ctx.request.body;
	const user = new User(data);
	user.save();
	ctx.body = {
		errno: 0,
		message: 'success'
	}
}

const addStore = async (ctx) => {
	const data = ctx.request.body;
	const userCurrent = await getUserData({name: data.name});

	console.log(userCurrent[0].store);

	const store = userCurrent[0].store ? [userCurrent[0].store].push(data.store) : data.store;

	const addStoreData = () => {
		return new Promise((resolve,reject) => {
			User.update({name: userCurrent[0].name},{$set: {store: [store]}}).exec(() => {
				resolve();
			})
		})
	};

	await addStoreData();
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
	// const data = ctx.request.body;
	// const userCurrent = await getUserData({name: data.name});
	// console.log(userCurrent);



	// const addStoreData = () => {
	// 	return new Promise((resolve,reject) => {
	// 		User.update({name: userCurrent})
	// 	})
	// }
}


module.exports = {getUser,postUser,addStore};