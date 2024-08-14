import Config from '@/config/index.js';
export default {
	onShareAppMessage(res) { //发送给朋友
		// let shareObj = {
		// 	title: Config.wxShareObj.title, //分享的标题    默认是小程序的名称
		// 	path: Config.wxShareObj.homePath, //好友点击分享之后跳转的页面   默认是当前页面，必须是以‘/’开头的完整路径
		// 	imageUrl: Config.wxShareObj.imageUrl //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入imageUrl或设置为''， 则使用默认截图。显示图片长宽比是 5:4
		// }

		let shareObj = {...(Config.wxShareObj || {})}

		/**
		 * 分享来源
		 * 
		 * <button class="weixinShare" hover-class="none" open-type="share" :data-obj="shareInfo">
		 */
		if (res.from === 'button') { //来自页面内分享按钮
			//获取data-obj传递的参数
			let dataObj = res.target.dataset.obj
			
			shareObj = Object.assign(shareObj, dataObj)
		} else { //页面右上角...分享按钮

		}
		// console.log('~~~~~shareObj111111111', shareObj)
		return shareObj
	},
	onShareTimeline(res) { //分享到朋友圈
		return {}
	},
}