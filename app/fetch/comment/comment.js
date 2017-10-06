import { get } from '../get';
import { post } from '../post';

export function getCommentList(commentId){
	const result = post('/api/getCommentList',{
		commentId
	});
	return result;
}

export function addToComment(name,commentId,commentStar,comment){
	const result = post('/api/addToComment',{
		name,
		commentId,
		commentStar,
		comment
	});
	return result;
}
