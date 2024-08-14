import { request } from '@/common/request.js'

//创建订单
export function createOrder(data) {
	return request({
		url: '/api/order/roomReservation',
		data
	});
}

//取消订单|发起退款
export function cancelOrder(orderNo) {
	return request({
		url: '/api/order/cancel',
		data: {
            orderNo,
        }
	});
}

//获取订单详情
export function getOrderDetail(orderNo) {
	return request({
		url: '/api/order/orderDetail',
		data: {
            orderNo,
        }
	});
}

//获取订单列表
export function getOrderList(data) {
	return request({
		url: '/api/order/orderList',
		data: {
            currentPage: data.currentPage,
            orderType: data.orderType //订单类型：1全部、2待使用、3使用中、4待评价
        }
	});
}

// 发起0元支付（不调用微信支付）
export function appPayZero(data) {
	return request({
		url: '/api/wxpay/appPayZero',
		data
	});
}


// 取消退款申请
export function cancelRefunds(orderNo) {
	return request({
		url: '/api/order/cancelRefunds',
		data: {
		        orderNo,
		    }
	});
}

