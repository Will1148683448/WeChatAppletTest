<!-- 确认支付 -->
<template>
	<view>
		<kr-navbar title="确认支付" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar>

		<!-- 订单信息 -->
		<order-info-card :item="item"></order-info-card>

		<!-- 价格例子 -->
		<view>价格：{{ amountFormat_mixin(item.payAmount) }}元</view>

		<!-- 优惠券选择 -->
		<view>优惠券：</view>
		<text v-if="!selectedCoupon" :class="{ 'coupon-green': item.couponNum > 0 }">{{ couponLabel }}</text>
		<text v-else>-¥{{ amountFormat_mixin(selectedCoupon.discountAmount) }}</text>
		<button @tap.stop="chooseCouponHandler">
			优惠券选择
		</button>

		<!-- 底部bar -->
		<order-footer-bar :price="totalPrice" :hour="timeRange" btnTitle="支付" @btnTap="payHandler"></order-footer-bar>

		<!-- 自定义确认弹窗 -->
		<kr-alert :show="showAlert" :title="alertTitle" :showCancelButton="showCancelButton" @cancel="cancelAlertHandler"
			@confirm="confirmAlertHandler"></kr-alert>
		<!-- 优惠券选择器 -->
		<coupon-pick-view :show="showCouponPickView" :payAmount="item.payAmount" :selectItem="selectedCoupon" @close="closePickerHandler"
			@confirm="confirmPickerHandler"></coupon-pick-view>
	</view>
</template>

<script>
	import priceFormat_mixins from '@/common/mixins/priceFormat_mixins.js';
	import OrderInfoCard from '../components/order-info-card/index.vue'
	import OrderFooterBar from '../components/order-footer-bar/index.vue'
	import CouponPickView from '../components/coupon/coupon-pick-view/index.vue'

	import {
		appPayZero
	} from '@/api/order.js'
	import {
		throttle
	} from '@/common/debounce.js';
	import {
		parseDateToJson
	} from '@/common/util/datetime_util.js'

	import PayManager from "@/modules/wxPay/index.js";
	export default {
		mixins: [priceFormat_mixins],
		components: {
			OrderInfoCard,
			OrderFooterBar,
			CouponPickView
		},

		data() {
			return {
				// 订单信息
				item: {		
					couponNum: 0, //可用红包数量

					orderNo: "", //订单号
					payAmount: 100, //支付金额(原价)
				},

				/******* 自定义确认弹窗相关参数 *******/ 
				showAlert: false,
				showCancelButton: true,
				alertTitle: '',

				
				/******* 优惠券选择器相关参数 *******/ 
				showCouponPickView: false, // 是否展示优惠券选择
				// 选中的优惠卷对象
				selectedCoupon: null,
			}
		},
		computed: {
			//优惠券文本
			couponLabel() {
				if (this.item.couponNum == 0) {
					return '暂无'
				} else {
					return `${this.item.couponNum}张可用`
				}
			},

			//计算优惠券的最终价格
			totalPrice() {
				if (this.selectedCoupon) {
					return this.amountFormat_mixin(this.item.payAmount - this.selectedCoupon.discountAmount)
				}

				return this.amountFormat_mixin(this.item.payAmount)
			},

			//
			timeRange() {
				return 0
			}
		},
		onLoad(options) {
			if (options.item) {
				this.item = JSON.parse(decodeURIComponent(options.item));
			}	
		},
		methods: {

			//支付
			payHandler: throttle(async function() {
				if (this.totalPrice == 0) { //0元购
					this.toPayZero()
				} else {
					this.toPay()
				}

				// 跳转到订单列表页全部
				// uni.navigateTo({ url: '/pages/subOrder/evaluateOrder/index' })
			}),

			//0元购
			async toPayZero() {
				let res = await appPayZero({
					outTradeNo: this.item.orderNo,
					couponId: this.selectedCoupon.couponId, //优惠券id
				})
				// 刷新订单列表
				uni.$emit('refreshOrderList')
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				// 自定义跳转
				// uni.navigateBack({
				// 	delta: 2, //返回层数，2则上上页
				// })
				// uni.switchTab({
				// 	url: '/pages/tab/tabOrder/index'
				// })
				setTimeout(() => {
					uni.$u.toast(res.msg)
				}, 300)
			},

			// 拉起支付
			async toPay() {
				let params = {
					couponId: this.selectedCoupon.couponId, //优惠券id
					outTradeNo: this.item.orderNo, //订单号
				}
				let res = await PayManager.instance.initiatePayment(params)
				// 刷新订单列表
				uni.$emit('refreshOrderList')
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				// 自定义跳转
				// uni.navigateBack({
				// 	delta: 2, //返回层数，2则上上页
				// })
				// uni.switchTab({
				// 	url: '/pages/tab/tabOrder/index'
				// })
				
				setTimeout(() => {
					uni.$u.toast(res.msg)
				}, 300)
			},

			/******* 自定义弹窗 *******/ 
			confirmAlertHandler() {
				this.showAlert = false
			},
			async cancelAlertHandler() {
				this.showAlert = false
			},
			
			/******* 优惠券选择器 *******/ 
			// 选择优惠券
			chooseCouponHandler() {
				this.showCouponPickView = true
			},
			// picker确定（未选择优惠券时item返回null）
			confirmPickerHandler(item) {
				this.selectedCoupon = item
				this.showCouponPickView = false
			},
			// 关闭picker
			closePickerHandler() {
				console.log('close');
				this.showCouponPickView = false
			},
		}
	}
</script>

<style scoped lang="scss">

	.coupon-green {
		color: $theme;
	}
</style>