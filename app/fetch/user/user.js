import { get } from '../get';
import { post } from '../post';

export function postLoginData(name,password){
	const result = post('/api/login',{
		name,
		password
	});
	return result;
}

export function addUser(name,password){
	const result = post('/api/sign',{
		name: name,
		password: password
	});
	return result;
}