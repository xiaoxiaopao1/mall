const Poster = require('../model/poster');



// 获取海报图
const getPoster = async (ctx) => {
	const getPosterData = () => {
		return new Promise((resolve,reject) => {
			Poster.find().exec((err,data) => {
				resolve(data);
			})
		})
	};
	const content = await getPosterData();
	ctx.body = content;
}

module.exports = {getPoster};