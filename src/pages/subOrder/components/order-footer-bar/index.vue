<template>
	<view class="footer" @tap.stop="">

		<view class="flex flex-items-center flex-justify-between h-96">
			<view class="flex flex-items-end m-l-32">
				<text class="title">共计</text>
				<text class="unit m-l-14">¥</text>
				<text class="price">{{ price }}</text>
				<text class="mark">（已选{{hour}}小时）</text>
			</view>
			<view class="btn" @tap.stop="tapHandler">{{ btnTitle }}</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			price: {
				type: [String, Number],
				default: '0.00'
			},
			hour: {
				type: [String, Number],
				default: '0'
			},
			btnTitle: {
				type: String,
				default: '支付'
			}
		},
		methods: {
			tapHandler() {
				this.$emit('btnTap')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		width: 750rpx;
		height: 168rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;

		.h-96 {
			height: 96rpx;
		}

		.m-l-14 {
			margin-left: 14rpx;
		}

		.title {
			font-weight: 600;
			font-size: 28rpx;
			color: #333333;
		}

		.unit {
			font-weight: 600;
			font-size: 24rpx;
			color: #E50012;
		}

		.price {
			font-weight: 600;
			font-size: 28rpx;
			color: #E50012;
		}

		.mark {
			font-weight: 600;
			font-size: 20rpx;
			color: #666666;
		}

		.btn {
			width: 272rpx;
			height: 96rpx;
			background: #2A8151;

			font-weight: 500;
			font-size: 28rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>