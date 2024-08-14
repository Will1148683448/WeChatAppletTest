/**
 * https://uniapp.dcloud.net.cn/api/system/getWindowInfo.html
 */

// uni.getWindowInfo()


//rpx转px
export function upx2px(upx) {
	return uni.upx2px(upx)
}

//获取移动端状态栏高度
export function getStatusBarHeight() {
	let systemInfo = uni.getSystemInfoSync()
	return systemInfo.statusBarHeight
}

//获取屏幕高度
export function getScreenHeight() {
	let systemInfo = uni.getSystemInfoSync()
	return systemInfo.windowHeight
}

//getSystemInfo
export function getSystemInfo(key) {
	return new Promise(function(resolve, reject) {
		uni.getSystemInfo({
			success(res) {
				key ? resolve(res[key]) : resolve(res)
			}
		})
	})
}

//获取组件高度
export function getDomHeight(_this, selector) {
	return new Promise(function(resolve, reject) {
		const query = uni.createSelectorQuery().in(_this);
		query.select(selector).boundingClientRect(data => {
			resolve(data.height)
		}).exec();
	})
}

//获取scrollview高度
export async function getScrollViewHeight(_this, arr) {
	let height = 0
	let windowHeight = await getSystemInfo('windowHeight')
	for (let i = 0; i < arr.length; i++) {
		let h = await getDomHeight(_this, arr[i])
		height += h
	}
	return windowHeight - height
}

//自定义导航栏时获取top尺寸 单位px
export async function getCustomBarTop() {
	let customBarTop = 0
	let statusBarHeight = await getSystemInfo('statusBarHeight')
	// #ifndef MP
	customBarTop = statusBarHeight + 45;
	// #endif

	// #ifdef MP-WEIXIN
	let custom = wx.getMenuButtonBoundingClientRect();
	customBarTop = custom.bottom + custom.top - statusBarHeight;
	// #endif		

	return customBarTop
}

//获取属性值
export function getPropValue(_this, selector, prop) {
	return new Promise(function(resolve, reject) {
		uni.createSelectorQuery().in(_this) // 注意这里要加上 in(this)
			.select(selector)
			.fields({
				properties: [prop],
			})
			.exec((res) => {
				const value = res?. [0]?.value
				resolve(value)
			})
	})
}
