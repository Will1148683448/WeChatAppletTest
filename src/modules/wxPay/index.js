import {
	getPayParams
} from "./api/index.js"

class PayMpManager {
	constructor() {

	}
	//拉起支付
	async initiatePayment(params) {
		console.log('～～～进入小程序支付')
		uni.showLoading({
			title: "支付中",
			mask: true
		})

		let res = await getPayParams(params)
		return new Promise((resolve, reject) => {
			if (res.status != 1) {
				uni.hideLoading()
				resolve(res)
				return
			}
			let payConfig = res.data
			uni.requestPayment({
				"provider": "wxpay",
				"appId": payConfig.appId,
				"nonceStr": payConfig.nonceStr,
				"package": payConfig.prepayId,
				"signType": 'rsa',
				"timeStamp": payConfig.timeStamp,
				"paySign": payConfig.paySign,
				success(res) {
					uni.hideLoading()
					if (res.errMsg === 'requestPayment:ok') {
						resolve({
							status: 1,
							msg: '支付成功'
						})
					}
				},
				fail(e) {
					console.log('~~~~~~requestPayment:fail cancel', e)
					uni.hideLoading()
					if (e.errMsg === 'requestPayment:fail cancel') {
						resolve({
							status: 0,
							msg: '取消支付'
						})
					} else {
						resolve({
							status: 0,
							msg: '支付失败'
						})
					}
				}
			})
		})
	}

}
//单例
const instance = new PayMpManager()

export default {
	instance
}