<template>
	<view class="cell" @tap.stop="">
		
	</view>
</template>
<script>
	import priceFormat_mixins from '@/common/mixins/priceFormat_mixins.js';
	import {
		parseDateToJson
	} from '@/common/util/datetime_util.js'
	import {
		callPhone
	} from '@/common/util/device_feature_util.js'
	import {
		throttle
	} from '@/common/debounce.js';
	import {
		createOrder
	} from '@/api/order.js'

	export default {
		mixins: [priceFormat_mixins],
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						orderNo: "", //订单编号
						orderStatus: 0, //订单状态：-1已取消，0待付款，1待使用，2使用中，3待评价，4申请退款中，9已结束
						startTime: 0, //开始时间（单位：时间戳）
						endTime: 0, //结束时间（单位：时间戳）
						payAmount: 0, //应付金额（原价，单位：分）
						actualAmount: 0, //实付金额（优惠后价格，单位：分）
						linkPhone: "", //联系电话
					}
				}
			}
		},
		data() {
			return {

			}
		},
		computed: {
			// 状态文本
			statusTitle() {
				switch (this.item.orderStatus) {
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
			},
			// 显示的金额
			orderPrice() {
				// 待付款使用应付金额
				if (this.item.orderStatus == 0) {
					return this.item.payAmount
				}
				// 否则显示实付金额
				return this.item.actualAmount
			},
			// 状态文本样式
			statusClass() {
				switch (this.item.orderStatus) {
					case -1: //已退款
					case 9: //已结束
						return 'status-grey';
					case 3: //待评价
					case 4: //申请退款中
						return 'status-red';
					default:
						break;
				}
				return 'status-green'
			},

			// 预约时间格式化2023-03-01 10:00-12:00
			dateFormat() {
				let startDateObj = parseDateToJson(new Date(this.item.startTime))
				let endDateObj = parseDateToJson(new Date(this.item.endTime))
				return `${startDateObj.year}-${startDateObj.month}-${startDateObj.day} ${startDateObj.hours}:${startDateObj.minutes}-${endDateObj.hours}:${endDateObj.minutes}`
			},

			// 是否展示支付按钮
			showPayBtn() {
				switch (this.item.orderStatus) {
					case 0: //待付款
						return true
					default:
						break;
				}
				return false
			}
		},
		methods: {
			// 联系商家
			toConcatStore() {
				callPhone(this.item.linkPhone)
			},

			//继续支付
			toPay: throttle(async function() {
				let params = {
					orderNo: this.item.orderNo
				}
				this.createOrderRequest(params)
			}),

			// 跳转订单详情
			toOrderDetail() {
				uni.navigateTo({
					url: `/pages/subOrder/orderDetail/index?orderNo=${this.item.orderNo}`
				})
			},

			// 创建订单并跳转确认支付页面
			async createOrderRequest(params) {
				uni.showLoading({
					title: '',
					mask: true
				})

				let data = {
					...params,
				}
				let res = await createOrder(data)
				uni.hideLoading()
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				let orderInfo = res.data

				console.log('~~~~~', orderInfo)
				let item = encodeURIComponent(JSON.stringify(orderInfo))
				uni.navigateTo({
					url: '/pages/subOrder/confirmOrder/index?item=' + item
				})

				// 刷新订单列表
				uni.$emit('refreshOrderList')
			}
		}
	}
</script>
<style scoped lang="scss">
	.cell {
		padding: 32rpx 32rpx 0 32rpx;
	}
</style>