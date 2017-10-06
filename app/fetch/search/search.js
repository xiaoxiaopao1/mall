import { get } from '../get';
import { post } from '../post';


export function getSearchResult(keyword,num,count){
	const result = post('/api/getSearchResult',{
		keyword,
		num,
		count
	});
	return result;
}

export function getSearchResultCount(keyword){
	const result = post('/api/getSearchResultCount',{
		keyword
	});
	return result;
}