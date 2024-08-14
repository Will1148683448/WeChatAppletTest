import { request } from '@/common/request.js'

// 下单支付（获取支付参数）
export function getPayParams(data) {
	return request({
		url: '/api/wxpay/appPay',
		data
	});
}



