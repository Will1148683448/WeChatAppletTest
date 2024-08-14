import { request } from '@/common/request.js';

//获取支付可用优惠券列表
export function getCanUseCouponsList(actualAmount) {
	return request({
		url: '/api/order/coupons',
		data: {
            actualAmount,
            type: 1
        }
	});
}

//获取支付不可用优惠券列表
export function getCanotUseCouponsList(actualAmount) {
	return request({
		url: '/api/order/coupons',
		data: {
            actualAmount,
            type: 2
        }
	});
}

//获取用户中心的优惠券列表 type:获取类型：0未使用、1已使用、2已过期
export function getUserCouponList(data) {
	return request({
		url: '/api/user/getUserCouponList',
		data: {
            page: data.page,
            type: data.type
        }
	});
}

//兑换优惠券
export function exchangeCoupon(cdk) {
	return request({
		url: '/api/user/exchangeCdk',
		data: {
            cdk
        }
	});
}