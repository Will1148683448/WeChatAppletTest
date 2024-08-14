<!-- 自定义确认弹窗 -->
<!-- 用例 -->
<!-- <kr-alert :show="showAlert" title="是否确认取消订单" @cancel="cancelAlertHandler" @confirm="confirmAlertHandler"></kr-alert> -->
<template>
	<u-popup :show="show" mode="center" :round="radius" @close="closeHandler" @open="openHandler">
		<view class="container flex flex-col flex-items-center"
			:style="{ borderRadius: radius+'rpx'}">
			<!-- 标题 -->
			<view class="flex-1 flex flex-col flex-justify-center" style="padding-left: 40rpx; padding-right: 40rpx; margin-top: 40rpx;">
				<text class="title">{{ title }}</text>
			</view>


			<!-- 按钮组 -->
			<view class="flex flex-justify-center m-b-48">
				<!-- 取消按钮 -->
				<view v-if="showCancelButton" class="cancel-btn m-r-30" @tap.stop="cancelHandler">取消</view>
				<!-- 确定按钮 -->
				<view class="confirm-btn" :style="{width:showCancelButton?'260rpx':'550rpx'}" @tap.stop="confirmHandler">确定
				</view>
			</view>

			<!-- 铃铛图片 -->
			<kr-image class="alert-icon" :src="IMG_URL + 'common/ic_alert.png'" width="140rpx" height="140rpx" radius="0"
				:fade="false"></kr-image>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			// 是否展示
			show: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 切弹窗圆角（单位rpx）
			radius: {
				type: Number,
				default: 16
			},
			// 是否显示取消按钮
			showCancelButton: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			closeHandler(e) {
				this.$emit('close', e)
			},

			openHandler(e) {
				this.$emit('open', e)
			},

			cancelHandler() {
				this.$emit('cancel')
			},
			confirmHandler() {
				this.$emit('confirm')
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 614rpx;
		min-height: 460rpx;
		background: linear-gradient(180deg, #B8D9C7 0%, #FFFFFF 100%);
		// border-radius: 16rpx;
		// overflow: hidden;
		// padding: 20rpx 20rpx 48rpx; 
	}

	.title {
		// font-family: 'DINPro-Bold';
		// font-family: 'DINSKI CASUAL CONDENSED';
		font-weight: 600;
		font-size: 36rpx;
		color: #333333;
		text-align: center;
	}

	.m-t-132 {
		margin-top: 132rpx;
	}

	.m-t-96 {
		margin-top: 96rpx;
	}

	.cancel-btn {
		width: 260rpx;
		height: 80rpx;
		border-radius: 16rpx;
		border: 1px solid $theme;

		font-weight: 500;
		font-size: 28rpx;
		color: $theme;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.confirm-btn {
		width: 260rpx;
		height: 80rpx;
		background: $theme;
		border-radius: 16rpx;

		font-weight: 500;
		font-size: 28rpx;
		color: #fff;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.m-h-15 {
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.alert-icon {
		position: absolute;
		top: -70rpx;
		left: 237rpx;
	}

	.m-b-48 {
		margin-bottom: 48rpx;
	}

	.m-r-30 {
		margin-right: 30rpx;
	}
</style>