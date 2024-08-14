<!-- 不可用优惠券cell -->
<template>
	<view class="w-100% p-h-32 p-t-32">
		<!-- 浅绿色背景 -->
		<view class="continer-bg pos-relative" :style="{height:collapse?'232rpx':'302rpx'}">
			<!-- 规则 -->
			<text class="rule">优惠券规则：不可叠加使用，每次支付限用一张优惠券</text>

			<!-- 优惠券 -->
			<view class="continer flex">
				<view class="pos-relative">
					<!-- 背景图 -->
					<kr-image :src="IMG_URL + 'order/coupon/coupon_disable_bg.png'" width="240rpx" height="232rpx"
						:fade="true"></kr-image>
					<!-- 价格 -->
					<view class="flex flex-col flex-items-center pos-cc">
						<!-- 面额 -->
						<view class="flex flex-items-end">
							<text class="unit">￥</text>
							<text class="price">{{ amountFormat_mixin(item.discountAmount) }}</text>
						</view>
						<!-- 满减 -->
						<text class="sub-price">满{{amountFormat_mixin(item.minimumSpending)}}元可用</text>
					</view>
				</view>

				<view class="flex flex-col p-32 pos-relative flex-1">
					<!-- 标题 -->
					<text class="title text-cut-1">{{ item.couponName }}</text>
					<!-- 有效期 -->
					<text class="date m-t-8">有效期：{{ time_mixins(item.expiryDate,4) }}</text>
					<!-- 使用规则按钮 -->
					<rule-collapse-button class="rule-collapse-button" title="使用规则" :collapse.sync="collapse"
						color="#CCCCCC"></rule-collapse-button>
					<!-- 状态 -->
					<kr-image class="status-icon" :src="IMG_URL+'order/coupon/'+statusIcon" width="124rpx" height="124rpx"
						:fade="true"></kr-image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		time_mixins
	} from '@/common/mixins/time_mixins.js';
	import priceFormat_mixins from '@/common/mixins/priceFormat_mixins.js';
	import RuleCollapseButton from '../rule-collapse-button/index.vue'
	export default {
		mixins: [time_mixins, priceFormat_mixins],
		components: {
			RuleCollapseButton
		},
		props: {
			// 是否选择优惠券cell
			choose: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: () => {
					return {
						couponId: 0, //优惠券id
						couponName: "",//优惠券名称
						discountAmount: 0, //折扣金额
						effectiveDate: 1715097600000, //生效期
						expiryDate: 1715184000000, //有效期
						minimumSpending: 0, //最低消费(满多少可用)
						recordId: 0, //用户优惠卷记录id(未使用)
					}
				}
			},
			// 优惠券列表类型 0：未使用 1：已使用 2：已过期 3:可用 4:不可用
			couponListType: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				collapse: true, //cell是否已折叠
			}
		},
		computed: {
			statusIcon() {
				if (this.choose) {
					return 'ic_coupon_canot.png'
				}
				if (this.couponListType == 1) {
					return 'ic_coupon_used.png'
				} else if (this.couponListType == 2) {
					return 'ic_coupon_expired.png'
				}

				return ''
			},
		},
		methods: {

		}
	}
</script>
<style scoped lang="scss">
	.continer-bg {
		background: #EAEAEA;
		border-radius: 16rpx;

		width: 686rpx;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.continer {
		background: #fff;
		border-radius: 16rpx;

		width: 686rpx;
		height: 232rpx;

		position: absolute;
		left: 0;
		top: 0;
	}

	.rule {
		font-weight: 400;
		font-size: 24rpx;
		color: #CCCCCC;

		text-align: center;

		margin-bottom: 20rpx;
	}

	.unit {
		font-weight: 600;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.price {
		font-weight: 600;
		font-size: 36rpx;
		color: #FFFFFF;
	}

	.sub-price {
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;

		width: 240rpx;
		text-align: center;
	}

	.title {
		font-weight: 600;
		font-size: 32rpx;
		color: #CCCCCC;
	}

	.date {
		font-weight: 400;
		font-size: 20rpx;
		color: #CCCCCC;
	}

	.rule-collapse-button {
		position: absolute;
		left: 32rpx;
		bottom: 54rpx;
	}

	.status-icon {
		position: absolute;
		right: 16rpx;
		bottom: 16rpx;
	}
</style>