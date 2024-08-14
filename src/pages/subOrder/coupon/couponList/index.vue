<!-- 优惠券列表 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="优惠券" :autoBack="false" @leftClick="leftClick"></kr-navbar>
		<!-- tab 默认80rpx -->
		<kr-tabs :current="currentTab" :fixed="true" :top="wxPaddingTop+'px'" :list="tabList" @click="clickTab" @change="onTabChange"></kr-tabs>

		<!-- i 列表类型 0：未使用 1：已使用 2：已过期 3:可用 4:不可用-->
		<template v-for="i in [0, 1, 2]">
			<coupon-sublist :ref="`couponSublist${i}`" v-show="currentTab == i" :refresh="currentTab == i" :downAuto="false" :couponListType="i" :fixed="true" :top="totalPaddingTop+'px'" bottom="32rpx"></coupon-sublist>
		</template>
		
		
	</view>
</template>

<script>
import CouponSublist from '../../components/coupon/coupon-sublist/index.vue'
import{ exchangeCoupon } from '@/api/coupon.js'

export default {
	components: {
		CouponSublist
	},
	data() {
		return {
			tabList: [
				{
					name: '未使用',
				}, {
					name: '已使用'
				}, {
					name: '已过期'
				}
			],
			currentTab: 0, //0：未使用 1：已使用 2：已过期
		}
	},
	computed: {
		// navbar+tabbar 高度(单位px)
		totalPaddingTop() {
			return uni.upx2px(80) + this.wxPaddingTop
		}
	},
	onLoad(options) {
		// 扫码领取优惠券
		if (options.q) {
			console.log('~~~~~onLoad 参数', options)
			this.isFromQR = true
			//扫码时间戳，单位秒
			const scancode_time = parseInt(options.scancode_time)
			// 当前时间戳 单位毫秒
			let timestamp = new Date().getTime()
			let millSecs = timestamp - scancode_time * 1000

			// 当前时间-扫码时间小于5秒，就进行兑换操作，否则跳转到首页
			if (millSecs > 0 && millSecs < 5000 ) {
				const q = decodeURIComponent(options.q) // 获取到二维码原始链接内容) 
				let cdk = q.split('=')[1]
				this.$nextTick(() => {
					this.exchangeCoupon(cdk)
				});	
			} else {
				uni.reLaunch({ url: '/pages/tab/tabHome/index' })
			}
		}
	},
	methods: {
		//点击返回
		leftClick() {
			console.log('~~~~leftClick')
			if (this.isFromQR) {
				uni.reLaunch({ url: '/pages/tab/tabHome/index' })
			} else {
				uni.navigateBack({ delta: 1 })
			}
		},
		
		// 切换tab
		clickTab(item) {
			// console.log(item.index)
			this.currentTab = item.index
		},
		onTabChange(item) {
			// console.log(item.index)
		},

		// 领取优惠券
		async exchangeCoupon(cdk) {
			uni.showLoading({
					title: '',
					mask: true
			})
			let res = await exchangeCoupon(cdk)
			uni.hideLoading()
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				return
			}
			uni.$u.toast(res.msg)

			//刷新列表
			this.$nextTick(() => {
				this.$refs['couponSublist0'][0].refreshList()
			})
		}
	},

}
</script>

<style lang="scss">
page {
    background: $page-bg-gray;
}
</style>
<style scoped lang="scss">

</style>