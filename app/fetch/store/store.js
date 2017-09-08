import { get } from '../get';
import { post } from '../post';

export function getStoreList(name){
	const result = post('/api/getStoreList',{
		name
	});
	return result;
}

export function addToStore(name,storeId){
	const result = post('/api/addToStore',{
		name,
		storeId
	})
	return result;
}