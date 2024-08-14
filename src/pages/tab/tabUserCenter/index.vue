<!-- 个人中心 -->
<template>
	<kr-mescroll :loadOptions="loadOptions" :fixed="true" :upUse="false" @down="downCallback">
		<!-- 背景图 -->
		<kr-image :src="IMG_URL + 'userCenter/bg.png'" width="750rpx" height="560rpx" :fade="false" @tap.stop="toUserInfo"></kr-image>
		<!-- 头像和昵称 -->
		<view class="top-container flex flex-items-center" @tap.stop="toUserInfo">
			<!-- 头像 -->
			<kr-image :src="IMG_URL + 'common/default_avatar.png'" width="160rpx" height="160rpx" shape="circle"
				:fade="false"></kr-image>
			<!-- 昵称 -->
			<text class="nickname text-cut-1">{{nickName || ''}}</text>
		</view>

		<!-- Setting -->
		<view class="cell-group">
			<view class="flex flex-items-center p-h-32 h-132" v-for="(item, index) in settingList" :key="index"
				@click="clickCell(item)">
				<kr-image :src="item.icon" width="40rpx" height="40rpx" :fade="false"></kr-image>
				<text class="cell-title m-l-16">{{ item.title }}</text>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="primary-button radius-16 logout-btn" @tap="onLogout">退出登录</view>
	</kr-mescroll>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import Config from '@/config'
	import {
		logout,
		getUser
	} from '@/modules/wxLogin/index.js'
	import { navigateToLoginView, switchTabToHomeView } from "@/router";

	export default {
		data() {
			return {
				loadOptions: {
					status: '',
					size: 0,
					totalSize: 0,
				},
				userName: '',
				settingList: [{
						icon: `${Config.StaticWebUrl}/image/userCenter/s1.png`,
						title: '邀请用户',
						path: '/pages/subUser/invite/index'
					},
					{
						icon: `${Config.StaticWebUrl}/image/userCenter/s2.png`,
						title: '优惠券',
						path: '/pages/subOrder/coupon/couponList/index'
					},
					{
						icon: `${Config.StaticWebUrl}/image/userCenter/s3.png`,
						title: '优惠券兑换',
						path: '/pages/subOrder/coupon/exchangeCoupon/index'
					},
					{
						icon: `${Config.StaticWebUrl}/image/userCenter/s4.png`,
						title: '我要反馈',
						path: '/pages/subUser/feedback/index'
					}
				]


			}
		},
		computed: {
			...mapState({
				nickName: state => state.nickName,
			}),
		},
		onLoad(options) {
			console.log('~~~~onLoad', options)
			// 缓存邀请码（分享链接打开次页面时会传递邀请码）
			if (options.invite_code) {
				uni.setStorageSync('invite_code', options.invite_code)
				getApp().globalData.invite_code = options.invite_code
			}
		},
		onTabItemTap(e) {
			console.log('~~~~onTabItemTap', e, this.isNotFirstIn)
			if (this.isNotFirstIn) {
				getUser(true)
			}
		},
		mounted() {
			console.log('~~~~mounted')
			this.isNotFirstIn = true
		},
		methods: {
			async downCallback() {
				this.loadOptions = {
					status: 'loading'
				}
				await getUser(true)
				this.loadOptions = {
					status: 'success',
				}
			},
			clickCell(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			onLogout() {
				logout()
				uni.$u.toast('退出成功')

				// 跳转到首页
				switchTabToHomeView()
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/subUser/userInfo/editUserInfo/index'
				})
			}
		},

	}
</script>

<style scoped lang="scss">
	.top-container {
		position: absolute;
		z-index: 2;
		top: 200rpx;
		left: 48rpx;
	}

	.nickname {
		font-weight: 600;
		font-size: 20px;
		color: #FFFFFF;

		margin-left: 32rpx;
		max-width: 500rpx;
	}

	.cell-group {
		position: absolute;
		left: 32rpx;
		top: 472rpx;
		z-index: 2;

		width: 686rpx;
		height: 528rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.cell-title {
		font-weight: 400;
		font-size: 32rpx;
		color: #333333;
	}

	.h-132 {
		height: 132rpx;
	}

	.p-h-32 {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}

	.m-l-16 {
		margin-left: 16rpx;
	}

	.logout-btn {
		margin-left: 64rpx;
		margin-top: 500rpx;
	}
</style>