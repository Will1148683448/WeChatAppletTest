<!-- 订单详情 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="订单详情" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar>
		<kr-mescroll ref="mescroll-list" :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop + 'px'"
			:upUse="false" @down="downCallback">

			<!-- 订单信息 -->
			<!-- <order-info-card :item="orderInfo"></order-info-card> -->

			<!-- 安全区域 -->
			<view class="safe-footer"></view>
		</kr-mescroll>

		<!-- 底部bar -->
		<!-- <order-detail-footer-bar @popTitle="popTitle" :roomId="roomId" :orderInfo="orderInfo"
			@cancel="cancelHandler"></order-detail-footer-bar> -->

		<!--自定义确认弹窗 -->
		<kr-alert :show="showAlert" :title="alertTitle" :showCancelButton="showCancelButton"
			@cancel="cancelAlertHandler" @confirm="confirmAlertHandler"></kr-alert>
	</view>
</template>

<script>
import priceFormat_mixins from '@/common/mixins/priceFormat_mixins.js';
import OrderInfoCard from '../components/order-info-card/index.vue'
// import OrderDetailFooterBar from '../components/order-detail-footer-bar/index.vue'
import {
	getOrderDetail,
	cancelOrder,
	cancelRefunds
} from '@/api/order'
import {
	openLocation
} from '@/modules/Location/index.js'
import {
	parseDateToJson
} from '@/common/util/datetime_util.js'

export default {
	mixins: [priceFormat_mixins],
	components: {
		OrderInfoCard,
		// OrderDetailFooterBar
	},
	data() {
		return {
			// 订单信息
			orderInfo: {
				orderStatus: 0, //
			},

			/******* 自定义确认弹窗相关参数 *******/
			showCancelButton: true,
			alertTitle: '',
			showAlert: false,

			// 加载状态
			loadOptions: {
				status: '',
			},
		}
	},
	computed: {
		// 状态文本
		statusTitle() {
			switch (this.orderInfo.orderStatus) {
				case -1: //已退款
					return '已取消'
				case 0: //待付款
					return '待付款'
				case 1: //待使用
					return '待使用'
				case 2: //使用中
					return '使用中'
				case 3: //待评价
					return '待评价'
				case 5: //已取消
					return '已退款'
				case 4: //申请退款中
					return '申请退款中'
				case 9: //已结束
					return '已结束'
				default:
					break;
			}
			return ''
		}
	},
	onLoad(options) {
		this.orderNo = options.orderNo
	},
	mounted() {
		uni.$on('getOrderDetail', () => {
			console.log('mounted')
			this.$refs['mescroll-list'].refreshScroll()
			uni.$emit('refreshOrderList')
		})
	},
	destroyed() {
		uni.$off('getOrderDetail')
	},
	methods: {
		// 下拉刷新
		async downCallback() {
			this.loadOptions = {
				status: 'loading'
			}
			let res = await getOrderDetail(this.orderNo)
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				this.loadOptions = {
					status: 'error'
				}
				return
			}

			this.orderInfo = res.data
			this.loadOptions = {
				status: 'success',
			}
		},

		// 打开内置地图
		openMap() {
			console.log('~~~~~', this.orderInfo)
			let location = this.orderInfo.coordinate.split(',')
			let data = {
				latitude: location[1],
				longitude: location[0],
				name: this.orderInfo.shopName,
				address: this.orderInfo.address,
			}
			openLocation(data)
		},

		// 展示确认弹窗
		popTitle() {
			this.alertTitle = ''
			this.showCancelButton = false
			this.showAlert = true
		},

		// 取消订单
		cancelHandler(orderStatus) {
			console.log(this.orderInfo.orderType, '999')
			if (this.orderInfo.orderType == 2 || orderStatus == 0) {
				this.alertTitle = '是否取消订单'
				this.showCancelButton = true
				this.showAlert = true
				return
			}
			if (orderStatus == 4) {
				this.alertTitle = '是否取消申请'
			}
			if (orderStatus == 1) {
				this.alertTitle = '请于订单开始前1小时以上提交退款申请，否则需经商家审核，且活动结束前未审则无法退款。请提前规划，谢谢理解！'
			}
			this.showCancelButton = true
			this.showAlert = true
		},

		/******* 自定义确认弹窗 *******/
		// 取消弹窗	
		cancelAlertHandler() {
			this.showAlert = false
		},
		// 确认弹窗
		async confirmAlertHandler() {
			this.showAlert = false
			if (!this.showCancelButton) {
				return
			}
			if (this.orderInfo.orderStatus == 4) {
				console.log('取消退款申请')
				let res = await cancelRefunds(this.orderNo)
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				uni.switchTab({
					url: '/pages/tab/tabOrder/index'
				})
				uni.$emit('refreshOrderList')
				setTimeout(() => {
					uni.$u.toast(res.msg)
				}, 300)
			} else {
				let res = await cancelOrder(this.orderNo)
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				uni.switchTab({
					url: '/pages/tab/tabOrder/index'
				})
				uni.$emit('refreshOrderList')
				setTimeout(() => {
					uni.$u.toast(res.msg)
				}, 300)
			}
		}
	}
}
</script>

<style scoped lang="scss">

</style>