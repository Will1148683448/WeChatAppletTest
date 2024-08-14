<!--空布局:
参考mescroll-empty二开组件

<kr-nodata v-if="isShowEmpty"  @emptyclick="emptyClick"></kr-nodata>
-->
<template>
	<view class="mescroll-empty" :class="{ 'empty-fixed': fixed }" :style="{ 'z-index': zIndex, 'padding-top': top, 'padding-bottom': bottom }">
		<view>
			<image v-if="icon" :style="iconStyle" :src="icon" mode="widthFix" />
		</view>
		<view v-if="tip" :style="tipStyle">{{ tip }}</view>
		<!-- <view v-if="btnText" class="empty-btn" @click="emptyClick">{{ btnText }}</view> -->
	</view>
</template>

<script>
import Config from '@/config'
export default {
	props: {
		fixed: {
			type: Boolean,
			default: false
		},
		zIndex: {
			type: [String, Number],
			default: 1
		},

		icon: {
			type: [String, Object],
			default: `${Config.StaticWebUrl}/image/common/no_data.png`,
		},
		iconStyle: {
			type: String,
			default: 'width: 200rpx;height: 200rpx;'
		},
		tip: {
			type: String,
			default: '暂无内容~'
		},
		tipStyle: {
			type: String,
			default: 'font-size: 28rpx; color: #CCCCCC; margin-top: 22rpx;'
		},
		// 顶部内边距
		top: {
			type: String,
			default: '20vh'
		},
		// 底部内边距
		bottom: {
			type: String,
			default: '20vh'
		},

		iconWidth: {
			type: Number,
			default: 200
		},
		iconHeight: {
			type: Number,
			default: 200
		},
		iconRadius: {
			type: Number,
			default: 100
		},

	},
	computed: {

	},
	methods: {
		// 点击按钮
		emptyClick() {
			this.$emit('emptyclick');
		}
	}
};
</script>

<style>
/* 无任何数据的空布局 */
.mescroll-empty {
	box-sizing: border-box;
	width: 100%;
	/* padding: 100rpx 50rpx; */
	text-align: center;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* height: 60vh; */

	/* background: red; */

}

.mescroll-empty.empty-fixed {
	z-index: 99;
	/* position: absolute; */
	/*transform会使fixed失效,最终会降级为absolute */
	/* top: 100rpx; */
	/* left: 0; */
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
}

.mescroll-empty .empty-btn {
	display: inline-block;
	margin-top: 40rpx;
	min-width: 200rpx;
	padding: 18rpx;
	font-size: 28rpx;
	border: 1rpx solid #e04b28;
	border-radius: 60rpx;
	color: #e04b28;
}

.mescroll-empty .empty-btn:active {
	opacity: 0.75;
}
</style>
