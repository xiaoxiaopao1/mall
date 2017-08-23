const mongoose = require('mongoose');
const Article = require('../Model/article');

const addArticle = async (ctx) => {
	const data = ctx.request.body;
	const article = new Article(data);
	article.save();
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

const articleList = async (ctx) => {
	const getArticleList = () => {
		return new Promise((resolve,reject) => {
			Article.find({},null,{sort: {_id : -1}},(err,data) => {
				resolve(data);
			})
		})
	};
	const list = await getArticleList();
	ctx.body = list;
}

const findArticle = async (ctx) => {
	const findArticleData = (_id) => {
		return new Promise((resolve,reject) => {
			Article.find({_id: _id}).exec((err,data) => {
				resolve(data);
			})
		})
	}
	const data = ctx.request.body;
	const content = await findArticleData(data._id);
	ctx.body = {
		errno: 0,
		msg: 'success',
		content: content
	}
}

const delArticle = async (ctx) => {
	const delArticleData = (_id) => {
		return new Promise((resolve,reject) => {
			Article.remove({_id: _id}).exec((err,data) => {
				resolve();
			})
		})
	}
	const data = ctx.request.body;
	await delArticleData(data._id);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

const updateArticle = async (ctx) => {
	const updateArticleDate = (_id,title,content) => {
		return new Promise((resolve,reject) => {
			Article.update({_id: _id},{$set: {title: title,content: content}}).exec(() => {
				resolve();
			})
		})
	};
	const data = ctx.request.body;
	await updateArticleDate(data._id,data.title,data.content);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}

module.exports = {addArticle,articleList,findArticle,delArticle,updateArticle};

