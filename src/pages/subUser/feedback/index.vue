<!-- 用户反馈 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="我要反馈" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar>

		<!-- body -->
		<view class="p-32" :style="{ paddingTop: wxPaddingTop + 'px' }">
			<view class="m-t-32">
				<text style="font-size: 22rpx; color: #999;">* 此{{activeIndex == 0?'反馈':'投诉'}}为本小程序自有{{activeIndex == 0?'反馈':'投诉'}}渠道，非微信官方投诉渠道</text>
			</view>
			<!-- 顶部切换 -->
			<view class="top-container flex flex-justify-between p-32 m-t-16">
				<view class="top-item flex flex-col flex-items-center" :class="{ active: activeIndex == 0 }" @click="activeIndex = 0">
					<text class="title m-t-32">我要反馈</text>
					<text class="sub-title m-t-8">反馈产品改进意见</text>
				</view>

				<view class="top-item flex flex-col flex-items-center" :class="{ active: activeIndex == 1 }" @click="activeIndex = 1">
					<text class="title m-t-32">我要投诉</text>
					<text class="sub-title m-t-8">投诉问题解决问题</text>
				</view>
			</view>

			<!-- 我要反馈 -->
			<view v-show="activeIndex == 0" class="center-container m-t-32 p-32">
				<!-- 文本域 -->
				<kr-textarea v-model="fallbackContent" height="600rpx" placeholder="我们渴望了解您的想法！请填写您的反馈或建议，帮助我们提供更好的服务。"></kr-textarea>
				<!-- 上传照片 -->
				<view class="m-t-48">
					<upload-photo @afterRead="fallbackAfterRead"></upload-photo>
				</view>
				
			</view>

			<!-- 我要投诉 -->
			<view v-show="activeIndex == 1" class="center-container m-t-32 p-h-32 p-b-32">
				<!-- 姓名 -->
				<view class="h-120 flex flex-items-center">
					<text class="require-mark m-r-8">*</text>
					<text class="cell-title">姓名</text>
					<input class="right-input cell-input" maxlength="20" type="text" placeholder="请输入您的姓名"
						placeholder-class="cell-placeholder" v-model="name" />
				</view>
				<view class="line"></view>
				<!-- 联系方式 -->
				<view class="h-120 flex flex-items-center">
					<text class="require-mark m-r-8">*</text>
					<text class="cell-title">联系方式</text>
					<input class="right-input cell-input" maxlength="11" type="number" placeholder="请输入您的手机号"
						placeholder-class="cell-placeholder" v-model="phone" />
				</view>
				<view class="line"></view>
				<!-- 选择门店 -->
				<view class="h-120 flex flex-items-center" @tap="chooseStore">
					<text class="require-mark m-r-8">*</text>
					<text class="cell-title">选择门店</text>
					<view class="flex flex-items-center flex-justify-end flex-1">
						<text class="cell-placeholder m-r-8" :class="{'picker-title': selectedPickerIndex > 0}">{{ selectedShopName }}</text>
						<kr-image :src="IMG_URL + 'common/arrow_right.png'" width="40rpx" height="40rpx"
							:fade="false"></kr-image>
					</view>
				</view>
				<view class="line"></view>

				<!-- 文本域 -->
				<view class="m-t-32">
					<kr-textarea v-model="complainContent" height="600rpx" placeholder="您的投诉是我们改进的动力，请在此详细填写投诉内容，我们将尽快跟进处理。"></kr-textarea>
				</view>
				<!-- 上传照片 -->
				<view class="m-t-48">
					<upload-photo @afterRead="complainAfterRead"></upload-photo>
				</view>
			</view>

			<!-- 安全区域 -->
			<view class="m-b-240"></view>
		</view>

		<!-- 底部 -->
		<view class="foot flex flex-justify-center p-t-16" @tap.stop="">
			<view class="primary-button radius-16" @tap.stop="commit">提交</view>
		</view>

		<!-- 选择门店picker-view -->
		<kr-picker :loading="loading" :show="showPicker" title="选择门店" :list="shopList" :currentIndex="pickerIndex" @change="changeHandler" @confirm="confirmHandler" @close="closeHandler"></kr-picker>
	</view>
</template>

<script>
import UploadPhoto from '@/modules/uploadCloudOS/components/upload-photo/upload-photo.vue'
import { addFeedBack, addComplain, getShopList } from '@/api/user.js'
import { uploadFiles } from '@/modules/uploadCloudOS/upload-cos.js'
import { throttle } from '@/common/debounce.js';

export default {
	components: {
		UploadPhoto
	},
	data() {
		return {

			activeIndex: 0, //评价类型 0:反馈 1:投诉
			/*************** 反馈 *******************/
			fallbackContent: '', //反馈内容
			fallbackImageUrls: [], //反馈上传组件选择的图片数组

			/*************** 投诉 *******************/
			complainContent: '', //投诉内容
			complainImageUrls: [], //投诉上传组件选择的图片数组
			name: '', //投诉者姓名
			phone: '', //投诉者联系电话

			// 是否显示选择门店
			showPicker: false,
			loading: false, //门店列表是否加载中
			// 门店列表
			shopList: [
				// {
				// 	"shopId": 0,
				// 	"shopName": ""
				// }
			],
			pickerIndex: 0, //picker索引
			selectedPickerIndex: 0, //选中的门店索引
			selectedShopName: '请选择您要投诉的门店',
		}
	},
	
	methods: {
		// 图片组件回调函数
		fallbackAfterRead(imageUrls) {
			this.fallbackImageUrls = imageUrls
			// console.log('~~~~~aaaa', this.imageUrls)
		},
		// 图片组件回调函数
		complainAfterRead(imageUrls) {
			this.complainImageUrls = imageUrls
			// console.log('~~~~~aaaa', this.imageUrls)
		},

		//选择门店
		async chooseStore() {
			this.showPicker = true
			// console.log('~~~showPicker', this.showPicker)
			this.loading = true

			if (this.shopList.length > 1) {
				this.loading = false
				this.pickerIndex = this.selectedPickerIndex
				return
			}
			let res = await getShopList()
			this.loading = false
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				return
			}
			let list = res.data.map(item=> {
				return {
					...item,
					label: item.shopName
				}
			})
			this.shopList = [{
				shopId: -1,
				shopName: '--请选择--',
				label: '--请选择--'
			}].concat(list)

			console.log('~~~~~~22222', this.shopList)
		},

		changeHandler(index) {
			console.log('~~~index', index)

			this.pickerIndex = index
		},
		confirmHandler() {
			console.log('~~~~confirmHandler')
			this.showPicker = false
			this.loading = false

			this.selectedPickerIndex = this.pickerIndex

			if (this.selectedPickerIndex == 0) {
				this.selectedShopName = '请选择您要投诉的门店'
			} else {
				this.selectedShopName = this.shopList[this.selectedPickerIndex].shopName
			}
		},
		closeHandler() {
			this.showPicker = false
			this.loading = false
			console.log('close');

			this.pickerIndex = 0
		},

		// 提交
		commit: throttle(async function () {
			if (this.activeIndex == 0) {
				this.commitFallback()
			} else {
				this.commitComplain()
			}
		}),
		//提交反馈
		async commitFallback() {
			if (this.fallbackContent.trim() == '') {
				uni.$u.toast('请输入反馈内容')
				return
			}

			// 请求参数
			let params = {
				feedbackMsg: this.fallbackContent,
				type: 1
			}

			// 如果需要上传图片
			if (this.fallbackImageUrls.length > 0) {
				uni.showLoading({
					title: '',
					mask: true
				})
				let imgUrls = await uploadFiles(this.fallbackImageUrls).catch(e => {
					console.error(e)
					uni.$u.toast(e)
				})
				uni.hideLoading()
				if (imgUrls == null) {
					return
				}
				console.log('~~~~~~', imgUrls)

				// 上传的图片地址
				params.feedbackImg = imgUrls[0]
			}
			// 提交
			uni.showLoading({
				title: '',
				mask: true
			})
			let res = await addFeedBack(params)
			uni.hideLoading()
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				return
			}

			setTimeout(() => {
				uni.$u.toast(res.msg)
			}, 300);

			uni.navigateBack({ delta: 1 })
		},
		//提交投诉
		async commitComplain() {
			if (this.name.trim() == '') {
				uni.$u.toast('请输入姓名')
				return
			}

			if (this.phone.trim() == '') {
				uni.$u.toast('请输入联系电话')
				return
			}

			if (this.selectedPickerIndex == 0) {
				uni.$u.toast('请选择投诉门店')
				return
			}

			if (this.complainContent.trim() == '') {
				uni.$u.toast('请输入反馈内容')
				return
			}

			// 请求参数
			let params = {
				name: this.name,
				linkPhone: this.phone,
				shopId: this.shopList[this.selectedPickerIndex].shopId,
				feedbackMsg: this.complainContent,
				type: 2
			}

			// 如果需要上传图片
			if (this.complainImageUrls.length > 0) {
				uni.showLoading({
					title: '',
					mask: true
				})
				let imgUrls = await uploadFiles(this.complainImageUrls).catch(e => {
					console.error(e)
					uni.$u.toast(e)
				})
				uni.hideLoading()
				if (imgUrls == null) {
					return
				}
				console.log('~~~~~~', imgUrls)

				// 上传的图片地址
				params.feedbackImg = imgUrls[0]
			}
			// 提交
			uni.showLoading({
				title: '',
				mask: true
			})
			let res = await addComplain(params)
			uni.hideLoading()
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				return
			}

			setTimeout(() => {
				uni.$u.toast(res.msg)
			}, 300);

			uni.navigateBack({ delta: 1 })
		}
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
<style scoped lang="scss">
.top-container {
	width: 686rpx;
	height: 222rpx;
	background: #FFFFFF;
	box-shadow: 0 8rpx 8rpx 0 rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
}

.top-item {
	width: 294rpx;
	height: 150rpx;
	background: #F0F1F3;
	border-radius: 16rpx;

	.title {
		color: #333333;
		font-size: 32rpx;
	}

	.sub-title {
		color: #999999;
		font-size: 24rpx;
	}
}

.active {
	background: #2A8151;

	.title {
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.sub-title {
		color: #FFFFFF;
		font-size: 24rpx;
	}
}

.p-32 {
	padding: 32rpx;
}

.center-container {
	width: 686rpx;
	// height: 920rpx;
	background: #FFFFFF;
	box-shadow: 0 8rpx 8rpx 0 rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
}

.m-b-240 {
	margin-bottom: 240rpx;
}

.foot {
	width: 750rpx;
	height: 188rpx;
	background: #FFFFFF;

	position: fixed;
	left: 0;
	bottom: 0;
}

.m-t-48 {
	margin-top: 48rpx;
}


.h-120 {
	height: 120rpx;
}

.require-mark {
	font-weight: 600;
	font-size: 12px;
	color: $theme;
}

.cell-title {
	font-weight: 500;
	font-size: 28rpx;
	color: #000000;
}

.cell-input {
	font-weight: 400;
	font-size: 28rpx;
	color: #666666;
}

.m-r-8 {
	margin-right: 8rpx;
}

.picker-title {
	color: #666666 !important;
}

</style>