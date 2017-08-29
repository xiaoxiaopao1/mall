import { get } from '../get';
import { post } from '../post';

export function getProductCount(){
	const result = get('/api/productCount');
	return result;
}

export function getProductListData(num,count){
	const result = post('/api/productList',{
		num,
		count
	});
	return result;
}

export function addProductData(title,alias,price){
	const result = post('/api/backStage/addProduct',{
		title,
		alias,
		price
	});
	return result;
}

export function delProductData(_id){
	const result = post('/api/backStage/delProduct',{
		_id
	});
	return result;
}

export function updateProductData(_id,title,alias,price){
	const result = post('/api/backStage/updateProduct',{
		_id,
		title,
		alias,
		price
	});
	return result;
}

export function getSingleProductData(_id){
	const result = post('/api/backStage/getSingleProduct',{
		_id
	});
	return result;
}