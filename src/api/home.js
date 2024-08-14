import { request } from '@/common/request.js';


//获取轮播图列表
export function getBannerList() {
	return request({
		url: '/api/index/getBannerList',
	});
}

//首页业务列表
export function getHomeDataList(data) {
	return request({
		url: '/api/index/nearbyShop',
		data: {
			addressCoordinates: data.addressCoordinates,
			page: data.page
		}
	});
}

//搜索业务数据列表
export function searchDataList(data) {
	return request({
		url: '/api/index/getShopByName',
		data: {
			page: data.page,
			shopName: data.shopName
		}
	});
}