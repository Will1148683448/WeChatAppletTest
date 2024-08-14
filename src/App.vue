<script>
	import {
		getCustomBarTop
	} from '@/common/util/screen_util.js'
	// import {
	// 	getLocation
	// } from '@/modules/Location/index.js';
	import store from '@/store/index.js';
	export default {
		globalData: {
			token: uni.getStorageSync("token") || '', //用户token
			invite_code: uni.getStorageSync("invite_code") || '', //邀请码
		},
		onLaunch: async function() {
			// let token = uni.getStorageSync('development');
			console.log('App Launch');
			console.log('本地缓存的token', this.globalData.token)

			//胶囊信息
			// let menu = uni.getMenuButtonBoundingClientRect();
			//系统信息
			let system = uni.getSystemInfoSync();

			// console.log('胶囊', menu);
			console.log('statusBarHeight', system.statusBarHeight);
			// console.log('screenWidth', system.screenWidth);
			// console.log('screenHeight', system.screenHeight);
			// console.log('windowTop', system.windowTop);
			// console.log('windowBottom', system.windowBottom);
			// console.log('windowWidth', system.windowWidth);
			// console.log('windowHeight', system.windowHeight);
			// console.log('safeArea', system.safeArea);
			// console.log('safeAreaInsets', system.safeAreaInsets);

			// 计算导航栏高度
			getCustomBarTop().then(res => {
				console.log('NavBarPaddingTop:', res)
				store.commit('setNavBarPaddingTop', res)
			})

			//版本更新
			// #ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();
			updateManager.onUpdateReady(function() {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			// #endif

			// uni.loadFontFace({
			// 	global:true,
			//   family: 'DINPro',
			//   source: 'https://culture-stg.oss-cn-beijing.aliyuncs.com/static/font/DINPro-Bold.ttf',
			//   success() {
			// 	  console.log('success')
			//   }
			// })
		},
		onShow: async function(e) {
			console.log('App Show', e);
			// let res = await getLocation(true)
			// console.log(res,'666666666666666666666666')
			// if(res.status==1){
			// 	console.log(res,'666666666666666666666666')
			// 	let locationList = []
			// 	locationList.push(res.data.coordinate.latitude)
			// 	locationList.push(res.data.coordinate.longitude)
			// 	store.state.Location = locationList
			// 	uni.setStorageSync('locationList', locationList)
			// }else{
			// 	store.state.Location = []
			// }
		},
		onHide: function() {
			console.log('App Hide');
		},
		onError(e) {
			console.log('App onError', e);
		},
	};
</script>

<style lang="scss">
    // 自定义base64字体（字体转base64网站：https://transfonter.org/）
	@import url("@/static/css/fonts/index.css");

	// unocss
	.uno-start {
		--un: 0;
	}
	/* unocss 代码生成在这 */
	.uno-end {
		--un: 0;
	}
</style>