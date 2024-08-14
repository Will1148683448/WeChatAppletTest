import config from '@/config/index.js'
import {
	navigateToLoginView
} from '@/router/index.js'
import {
	logout
} from '@/modules/wxLogin/index.js'

//前置拦截
async function beforeRequest(options) {
	// console.log('这是什么')
	//1.默认选项
	let defaultOptions = {
		header: {
			'Content-Type': 'application/json'
		},
		// header: { 'Content-Type': 'application/x-www-form-urlencoded' },
		method: 'POST',
		timeout: 60000,
		dataType: 'json',
		responseType: 'text'
	}

	//2.把传参和默认选项合并，这样如果要自定义header，就要写全，Content-Type不能省，因为Object.assign只作用第一层
	let newOptions = Object.assign({}, defaultOptions, options)

	let token = getApp().globalData.token
	console.log(token, '~~~~~~~~~~~~~~~~~~~token')
	if (token) {
		newOptions.header['Authorization'] = token
		// uni.reLaunch({
		// 	url: "/pages/tabHome/index"
		// })
	} else {
		// uni.navigateTo({
		// 	url: "/pages/register/index"
		// })
	}

	//4.给url加上前缀
	newOptions.url = config.ApiUrl + newOptions.url

	return newOptions
}

//只是请求，然后返回结果，什么都不做
async function uniRequest(options) {
	// uni.showLoading({
	// 	title: '加载中'
	// });
	let res = await uni.request({
		...options
	})
	// uni.hideLoading();
	if (res.data.status == 10001) {
		//退出登录
		logout()
		
		//跳转登录页
		navigateToLoginView()

		// uni.showToast({
		// 	title: res.msg,
		// 	icon: 'none',
		// 	duration: 3000
		// });
	}
	return res

	// Promise写法
	// return new Promise((resolve, reject) => {
	// 	uni.request({
	// 		...options,
	// 		success(res) {
	// 			resolve(res);
	// 		},
	// 		fail(err) {
	// 			reject(err);
	// 		}
	// 	})
	// });
}

//后置拦截
async function handleResponse(res) {
	if (res.statusCode == 200) {
		// let {
		// 	status,
		// 	data,
		// 	msg
		// } = res.data;

		// if (status == 1) {
		// 	return data; //正确时，直接把data返回，省去取.data
		// }
		// //这种方式还没考虑周到，再想想
		// // else if (status == 10001) {
		// // 	await login(); //返回无权限时，重新登录。一般出现在开发时测试和生产环境切换时，正常线上不会出现这种情况

		// // 	throw res.data;
		// // }
		// else {
		// 	if (msg) {
		// 		uni.showToast({
		// 			title: msg,
		// 			icon: 'none',
		// 			duration: 3000
		// 		});
		// 	}

		// 	throw res.data; //操作失败，toast提示自定义错误信息，然后把错误抛出
		// }
		return res.data
	} else {
		throw res.data //请求失败，抛出错误，不提示
	}
}

//输出的request函数
function request(options) {
	return beforeRequest(options)
		.then(options => uniRequest(options))
		.then(res => handleResponse(res))

	// await写法，不如上面简单
	// let newOptions = await beforeRequest(options);
	// let result = await uniRequest(newOptions);
	// let data = await handleResponse(result);
	// return data;
}

export {
	request
}