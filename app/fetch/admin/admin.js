import { post } from '../post';

export function postAdminData(name,password){
	const result = post('/api/backStage/adminInfo',{
		name,
		password
	});
	return result;
}