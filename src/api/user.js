import { request } from '@/common/request.js'

//用户评论(评分和内容必填)
export function addComment(data) {
	return request({
		url: '/api/comment/addComment',
		data
	});
}

//用户反馈(图片非必填)
export function addFeedBack(data) {
	return request({
		url: '/api/comment/addFeedBack',
		data: {
            ...data,
            type: 1
        }
	});
}

//用户投诉(门店可选无，图片非必填)
export function addComplain(data) {
	return request({
		url: '/api/comment/addFeedBack',
		data: {
            ...data,
            type: 2
        }
	});
}

// 获取投诉门店列表
export function getShopList() {
	return request({
		url: '/api/comment/getShop'
	});
}

// 获取邀请码
export function getInviteStatisticsInfo() {
	return request({
		url: '/api/user/getInvitation'
	});
}