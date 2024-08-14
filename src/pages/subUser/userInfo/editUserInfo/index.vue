<!-- 修改昵称 -->
<!-- 个人资料 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="个人信息" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar>

		<!-- 修改头像区域 -->
		<!-- <button class="avatar-wrapper pos" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl" />
			<text class="head-text">更换头像</text>
		</button> -->
		
		<!-- 修改昵称区域 -->
		<view class="flex flex-justify-center w-100%" :style="{ paddingTop: wxPaddingTop + 'px' }">
			<view class="card m-t-32">
				<!-- 昵称 -->
				<view class="flex flex-items-center flex-justify-between h-100% p-h-32">
					<text class="nickname-title">昵称</text>
					<input type="nickname" v-model="userName" @input="input" class="cell-input right-input" placeholder="请输入昵称"
						placeholder-class="cell-placeholder" :maxlength="20" />
				</view>
				<!-- ID -->
				<!-- <view class="flex m-t-32">
					<view class="nickname-text">ID</view>
					<view class="id-text">{{userId}}</view>
				</view> -->
			</view>
		</view>

		<!-- 保存按钮 -->
		<view class="pos-absolute r-0 b-0" style="right: 64rpx;">
			<view class="primary-button " @tap.stop="submit">保存</view>
			<!-- 安全底部 -->
			<view class="safe-footer"></view>
		</view>

	</view>
</template>

<script>
	import {
		updateUserInfo
	} from '@/api/login.js'
	import {
		getUser
	} from '@/modules/wxLogin/index.js'
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				// avatarUrl: '', // 头像
				userName: '', // 昵称
				// imgList: [], // 要上传的图片列表
				// userId:'',//用户ID
			}
		},
		computed: {
			...mapState({
				nickName: state => state.nickName,
			}),

			// saveFlag() {
			// 	if (this.nickName === '' || this.avatarUrl === '') {
			// 		return false;
			// 	} else {
			// 		return true;
			// 	}
			// }
		},
		onLoad() {
			this.userName = this.nickName
			// this.userId = uni.getStorageSync('userId')
			// this.avatarUrl = uni.getStorageSync('headImg')
			// this.nickName = uni.getStorageSync('nickName')
		},
		methods: {
			input(e) {
				// 获取input事件的参数
				// 使用replace方法去除空格
				this.userName = e.detail.value;

			},
			// 选择头像
			// async onChooseAvatar(e) {
			// 	console.log('~~~~~~~~~~~~', e.detail)
			// 	const avatarUrl = e.detail.avatarUrl
			// 	this.avatarUrl = avatarUrl
			// 	let path = this.avatarUrl
			// 	let lastIndex = path.lastIndexOf('.')
			// 	let type = path.substring(lastIndex)
			// 	this.imgList = [{
			// 		path: path,
			// 		type: type
			// 	}]
			// 	console.log('~~~~~~~~~~~~~~', this.imgList)
			// },

			// 失去焦点(type为nickname时，只有在失去焦点时才会获得微信昵称)
			onBlur(e) {
				// this.nickName = e.detail.value.trim()
			},

			// 提交
			async submit() {
				this.userName = this.userName.trim()
				if (this.userName == '') {
					uni.$u.toast('昵称不能为空')
					return
				}
				let res = await updateUserInfo({
					nickName: this.userName
				})
				console.log(res, '修改了')
				if (res.status == 1) {
					await getUser(true)
					uni.navigateBack({
						delta: 1 // delta值为1时表示返回的页面层数
					});
					setTimeout(() => {
						uni.$u.toast(res.msg)
					}, 300)
				} else {
					uni.$u.toast(res.msg)
				}
			},

			// 修改用户信息
			// async updateUserInfo(params) {
			// 	let ret = await updateUserInfo(params)
			// 	console.log('修改信息', ret)
			// 	if (ret.status !== 1) {
			// 		uni.$u.toast(res.msg)
			// 		return
			// 	}
			// 	uni.$u.toast(res.msg)
			// 	// 修改成功后，更新本地缓存
			// 	// if (params.headImg) {
			// 	// 	uni.setStorageSync('headImg', params.headImg)
			// 	// }
			// 	if (params.nickName) {
			// 		uni.setStorageSync('nickName', params.nickName)
			// 	}
			// 	// 返回个人中心
			// 	// this.backToUserCenter()
			// },

			// 返回个人中心
			// backToUserCenter() {
			// 	uni.switchTab({
			// 		url: '/pages/tabUserCenter/index'
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.cell-placeholder {
		font-weight: 400;
		font-size: 28rpx;
		color: #CCCCCC;
	}
</style>

<style lang="scss" scoped>
	.card {
		width: 686rpx;
		height: 120rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.nickname-title {
		font-weight: 500;
		font-size: 28rpx;
		color: #000000;
	}

	.cell-input {
		font-weight: 400;
		font-size: 28rpx;
		color: #000;
	}

	.cell-placeholder {
		font-weight: 400;
		font-size: 28rpx;
		color: #CCCCCC;
	}


	.id-text {
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		margin-left: 88rpx;
	}

	.avatar-wrapper {
		padding: 0;
		margin: 28rpx auto;
		width: 186rpx;
		height: 202rpx;
		position: relative;
		background-color: transparent;

		&::after {
			border: none;
		}

		.avatar {
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
		}

		.head-text {
			font-weight: 600;
			font-size: 36rpx;
			color: #333333;
			margin-top: 16rpx;
			margin-left: 20rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			// top: 0;
		}

		.update-icon {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			bottom: 0;
			right: 0;
		}
	}
</style>