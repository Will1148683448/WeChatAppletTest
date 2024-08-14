import { request } from '@/common/request.js';

// 微信code登录
export function wxCodeLoginApi(data) {
	return request({
		url: '/api/wechat/getWxAppletUserDetail',
		data: {
			code: data.code
		}
	});
}
//微信绑定手机号登录
export function wxPhoneLoginApi(data) {
	return request({
		url: '/api/login/wxLogin',
		data
	});
}
// 获取验证码
export function sendCode(data) {
	return request({
		url: '/api/wechat/sendCode',
		data: {
			phone: data.phone
		}
	});
}

// 手机号验证码登录
export function phoneLogin(data) {
	return request({
		url: '/api/wechat/phoneLogin',
		data: {
			code: data.code,
			phone: data.phone
		}
	});
}

//获取微信用户openid
export function getOpenid(data) {
	return request({
		url: '/api/wxpay/getOpenid',
		data
	});
}


//获取用户信息
export function getUserInfo() {
	return request({
		url: '/api/user/getUser',
	});
}

//修改用户信息
export function updateUserInfo(data) {
	return request({
		url: '/api/user/updateUser',
		data
	});
}
// 隐私协议
export function privacyProtocol(data) {
	return request({
		url: '/api/systemDetail/privacyProtocol',
		data
	});
}
// 注册协议
export function registrationProtocol(data) {
	return request({
		url: '/api/systemDetail/registrationProtocol',
		data
	});
}

