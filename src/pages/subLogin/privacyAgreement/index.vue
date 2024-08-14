<template>
	<view class="page">
		<kr-navbar :fixed="true" title="隐私协议" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar>
		<!-- 占位 -->
		<view :style="{height: wxPaddingTop+'px'}"></view>
		<!-- 主体 -->
		<view class="box">
			<view class="box-top-title">
				用户隐私协议
			</view>
			<view class="" style="margin-top: 16rpx;">
				<text class="box-title"> {{ protocol }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		privacyProtocol
	} from '@/api/login.js';
	export default {
		data() {
			return {
				// 协议文本
				protocol: ''
			}
		},
		mounted() {
			this.privacyProtocol()
		},
		methods: {
			async privacyProtocol() {
				let res = await privacyProtocol()
				if (res.status == 1) {
					this.protocol = res.data.protocol
				}
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
		/* position: fixed; */
	}

	.box-title {
		line-height: 48rpx;
		color: #333333;
		font-size: 28rpx;
	}

	.box-top-title {
		text-align: center;
		line-height: 48rpx;
		color: #333333;
		font-size: 36rpx;
	}

	.box {
		padding: 32rpx 48rpx;
	}
</style>