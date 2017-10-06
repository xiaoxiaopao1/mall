const Comment = require('../model/comment');
const Product = require('../model/product');

const getCommentListData = (commentId) => {
	return new Promise((resolve,reject) => {
		Comment.find({commentId: commentId},null,{sort: {_id: -1}}).exec((err,data) =>{
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

const getCommentList = async (ctx) => {
	const data = ctx.request.body;
	const comment = await getCommentListData(data.commentId);
	ctx.body = {
		errno: 0,
		msg: 'success',
		data: comment
	}
}

const addToComment = async (ctx) => {
	const data = ctx.request.body;
	const comment = new Comment(data);
	comment.save();
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
}



module.exports = {getCommentList,addToComment};