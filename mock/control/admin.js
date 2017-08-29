const Admin = require('../model/admin');

const getAdminData = (arg={}) => {
	return new Promise((resolve,reject) => {
		Admin.findOne(arg).exec((err,data) => {
			resolve(data);
		})
	});
};

// 管理员登录
const adminCheck = async (ctx) => {
	let nameErr = true,
		passwordErr = true;
	const postData = ctx.request.body;
	const adminData = await getAdminData({name:postData.name});
	if (adminData) {
		nameErr = false;
		if (adminData.password == postData.password) {
			passwordErr = false;
		}
	}else{
		// 如果没找到用户名，只需提醒用户用户名错误，密码不给错误提示
		// 即passwordErr = false
		passwordErr = false;
	}
	ctx.body = {
		errno: 0,
		msg: 'success',
		nameErr,
		passwordErr
	}
}

module.exports = {adminCheck};

