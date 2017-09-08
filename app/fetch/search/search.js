import { get } from '../get';
import { post } from '../post';


export function getSearchResult(keyword){
	const result = post('/api/getSearchResult',{
		keyword
	});
	return result;
}