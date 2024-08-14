<!-- 服务评价 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="评价"></kr-navbar>
		<!-- body -->
		<view class="p-32" :style="{ paddingTop: wxPaddingTop + 'px' }">
			<view class="center-container m-t-32 p-h-32 p-b-32">
				<!-- 标题 -->
				<view style="height: 48rpx;"></view>
				<view class="flex flex-justify-center">
					<text class="title">商品评价</text>
				</view>

				<!-- 评分 -->
				<view class="m-t-20 flex flex-justify-center">
					<kr-rate @changeRate="changeRate" :minCount="0" size="70" activeColor="#2A8151" count="5" :value="score"
						:allowHalf="true"></kr-rate>
				</view>
				<!-- 线 -->
				<view class="line m-t-48"></view>
				<!-- 文本域 -->
				<view class="m-t-32">
					<kr-textarea v-model="content" height="600rpx" placeholder="请填写您的评价内容～"></kr-textarea>
				</view>
				<!-- 上传照片 -->
				<view class="m-t-48">
					<upload-photo @afterRead="afterRead"></upload-photo>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="foot flex flex-justify-center p-t-16">
			<view class="primary-button radius-16" @tap.stop="commit">提交</view>
		</view>
	</view>
</template>

<script>
	import UploadPhoto from '@/modules/uploadCloudOS/components/upload-photo/upload-photo.vue'
	import {
		uploadFiles
	} from '@/modules/uploadCloudOS/upload-cos.js'
	import {
		addComment
	} from '@/api/user.js'

	export default {
		components: {
			UploadPhoto
		},
		data() {
			return {
				content: '', //评价内容
				score: 5, //评分

				imageUrls: [] //上传组件选择的图片数组
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
		},
		methods: {
			changeRate(e) {
				this.score = e
				console.log(e, this.score, 'this.score')
			},
			// 图片组件回调函数
			afterRead(imageUrls) {
				this.imageUrls = imageUrls
				// console.log('~~~~~aaaa', this.imageUrls)
			},
			//提交
			async commit() {

				if (this.content.trim() == '') {
					uni.$u.toast('请输入评价内容')
					return
				}

				// 请求参数
				let params = {
					content: this.content,
					score: this.score,
					orderNo: this.orderNo
				}

				// 如果需要上传图片
				if (this.imageUrls.length > 0) {
					uni.showLoading({
						title: '',
						mask: true
					})
					let imgUrls = await uploadFiles(this.imageUrls).catch(e => {
						console.error(e)
						uni.$u.toast(e)
					})
					uni.hideLoading()
					if (imgUrls == null) {
						return
					}
					console.log('~~~~~~', imgUrls)

					// 上传的图片地址
					params.commentImg = imgUrls[0]
				}
				// 提交
				uni.showLoading({
					title: '',
					mask: true
				})
				let res = await addComment(params)
				uni.$emit('getOrderDetail')
				uni.hideLoading()
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}

				setTimeout(() => {
					uni.$u.toast(res.msg)
				}, 300);

				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('refreshList')
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.center-container {
		width: 686rpx;
		// height: 920rpx;
		background: #FFFFFF;
		box-shadow: 0 8rpx 8rpx 0 rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
	}

	.title {
		font-weight: 500;
		font-size: 32rpx;
		color: #333333;
	}

	.p-t-48 {
		margin-top: 48rpx;
	}

	.m-t-48 {
		margin-top: 48rpx;
	}

	.m-t-20 {
		margin-top: 20rpx;
	}

	.foot {
		width: 750rpx;
		height: 188rpx;
		background: #FFFFFF;

		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>