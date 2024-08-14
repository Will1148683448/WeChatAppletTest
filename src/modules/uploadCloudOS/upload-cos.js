import { getCosAuthorKey } from './api/index.js';

//走的是，COS的uniapp直传实践，参考：https://cloud.tencent.com/document/product/436/71469
//filePath：小程序上传文件后得到的临时文件地址
async function _uploadFile(filePath) {
	//取文件的后缀
	let lastIndex = filePath.lastIndexOf('.');
	let extName = lastIndex > -1 ? filePath.slice(lastIndex) : '';
	//调用后端接口，获取上传令牌
	let res = await getCosAuthorKey();
	if (res.status != 1) {
		throw '上传失败';
	}
	let data = res.data
	//组织参数
	let formData = {
		key: data.key + extName,
		policy: data.policy,
		'q-sign-algorithm': data['q-sign-algorithm'],
		'q-ak': data['q-ak'],
		'q-key-time': data['q-key-time'],
		'q-signature': data['q-signature'],
		'x-cos-security-token': data['x-cos-security-token']
	};
	// console.log('~~~~', formData, data.key, extName)

	//调用uniapp上传文件api
	let res2 = await uni.uploadFile({
		url: data.url,
		filePath,
		name: 'file',
		formData,
	});
	//uniapp直传成功返回的是204
	if (res2.statusCode == 204) {
		let url = data.url + '/' + formData.key;
		// console.log('~~~back', data.url, formData.key)
		//这儿很奇怪，ios得到的url是个数组，安卓得到的是string，所以ios需要转一下
		return Array.isArray(url) ? url[0] : url;
	} else {
		throw '上传失败';
	}
}

/**
 * 上传文件
 * @param {Object | String} obj 
 * @returns 
 */
export async function uploadFiles(obj) {
	if (Array.isArray(obj)) {
		let promises = obj.map(item => _uploadFile(item));
		return await Promise.all(promises);
	} else {
		return await _uploadFile(obj);
	}
}
