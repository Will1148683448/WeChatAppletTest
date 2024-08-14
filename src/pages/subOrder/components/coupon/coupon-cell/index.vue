<!-- 优惠券cell -->
<template>
	<view class="w-100% p-h-32 p-t-32" @click.stop="selectCell">
		<!-- 浅绿色背景 -->
		<view class="continer-bg pos-relative" :style="{height:collapse?'232rpx':'302rpx'}">
			<!-- 规则 -->
			<text class="rule">优惠券规则：不可叠加使用，每次支付限用一张优惠券</text>

			<!-- 优惠券 -->
			<view class="continer flex">
				<view class="pos-relative">
					<!-- 背景图 -->
					<kr-image :src="IMG_URL + 'order/coupon/coupon_bg.png'" width="240rpx" height="232rpx" :fade="true"></kr-image>
					<!-- 价格 -->
					<view class="flex flex-col flex-items-center pos-cc">
						<!-- 面额 -->
						<view class="flex flex-items-end">
							<text class="unit">￥</text>
							<text class="price">{{ amountFormat_mixin(item.discountAmount) }}</text>
						</view>
						<!-- 满减 -->
						<text class="sub-price">满{{ amountFormat_mixin(item.minimumSpending) }}元可用</text>
					</view>
				</view>

				<view class="flex flex-col p-32 pos-relative flex-1">
					<!-- 标题 -->
					<text class="title text-cut-1">{{ item.couponName }}</text>
					<!-- 有效期 -->
					<text class="date m-t-8">有效期：{{ time_mixins(item.expiryDate,4) }}</text>
					<!-- 使用规则按钮 -->
					<rule-collapse-button class="rule-collapse-button" title="使用规则" :collapse.sync="collapse"
						color="#2A8151"></rule-collapse-button>

					<!-- 立即使用按钮 -->
					<view v-if="!choose" class="btn-frame" @tap.stop="toTabHome">立即使用</view>

				 	<!-- 选择优惠券 -->
	 	 	 	 	 <view v-else class="check-btn-frame" >
	 	 	 	 	 	 <kr-image v-show="!item.checked" :src="IMG_URL + 'order/coupon/ic_un_check.png'" width="32rpx"
	 	 	 	 	 	 	 height="32rpx" :fade="false"></kr-image>
	 	 	 	 	 	 <kr-image v-show="item.checked" :src="IMG_URL + 'order/coupon/ic_check.png'" width="32rpx"
	 	 	 	 	 	 	 height="32rpx" :fade="false"></kr-image>
	 	 	 	 	 </view>
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
	import { navigateToLoginView, switchTabToHomeView } from "@/router";

	export default {
		mixins: [time_mixins, priceFormat_mixins],
		components: {
			RuleCollapseButton
		},
		props: {
			// 优惠券列表类型 0：未使用 1：已使用 2：已过期 3:可用 4:不可用
			couponListType: {
				type: Number,
				default: 0
			},
			couponId: {
				type: [Number, String],
				default: ''
			},
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
			}
		},
		data() {
			return {
				collapse: true, //cell是否已折叠
			}
		},
		computed: {
			statusClass() {
				switch (this.couponListType) {
					case 0:
					case 1:
						return 'status-green';
					case 2:
						return 'status-red';
					default:
						break;
				}
				return 'status-green'
			},
		},
		mounted() {
			// console.log('~~~~mounted', this.item)
		},
		methods: {
			selectCell() {
				this.$emit('clickCell', this.item)
			},
			toTabHome() {
				switchTabToHomeView()
			}
		}
	}
</script>

<style scoped lang="scss">
	.continer-bg {
		background: rgba(42, 129, 81, 0.2);
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
		color: #2A8151;

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
		color: #333333;
	}

	.date {
		font-weight: 400;
		font-size: 20rpx;
		color: #999999;
	}

	.rule-collapse-button {
		position: absolute;
		left: 32rpx;
		bottom: 54rpx;
	}

	.btn-frame {
		padding: 12rpx 24rpx;
		background: $theme;
		border-radius: 8rpx;

		font-weight: 600;
		font-size: 12px;
		color: #FFFFFF;

		position: absolute;
		right: 32rpx;
		bottom: 32rpx;

	}

	.check-btn-frame {
		position: absolute;
		right: 22rpx;
		top: 90rpx;

		padding: 10rpx;
		// background: red;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>