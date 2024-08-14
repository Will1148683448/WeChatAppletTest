<!-- 兑换优惠券 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="优惠券兑换" leftIconColor="#fff" titleColor="#fff" :bgColor="'transparent'"></kr-navbar>
		<view class="top-bg"></view>
		<view class="panel flex flex-col flex-items-center">
			<text class="title m-t-52">优惠券券号</text>

			<!-- 输入框 -->
			<view class="input-box flex flex-items-center m-t-32">
				<input class="input-style" maxlength="20" type="text" v-model="keyword" placeholder="请输入兑换券的券码（CDK）" placeholder-class="placeholder" />
				<u-icon v-if="keyword.length" name="close-circle-fill" size="30" color="#999"
                @click.stop="onClear"></u-icon>
			</view>

			<!-- 立即兑换按钮 -->
			<view class="primary-button radius-16 m-t-32" @tap.stop="commit">立即兑换</view>

			<!-- 虚线 -->
			<view class="line-dash m-t-32"></view>

			<!-- 温馨提示 -->
			<text class="tip-title m-t-32">温馨提示</text>
			<view class="flex flex-col content-font m-t-32">
				<text>1.券码或兑换码只能兑换一次，不能重复使用。</text>
				<text>2.输入时请使用英文输入法，区分大小写字母。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import{ exchangeCoupon } from '@/api/coupon.js'
	import { throttle } from '@/common/debounce.js';

	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods: {
			onClear() {
				this.keyword = ''
			},

			commit: throttle(async function () {
				if (this.keyword.trim() == '') {
					uni.$u.toast('请输入兑换码')
					return
				} 
				uni.showLoading({
					title: '',
					mask: true
				})
				let res = await exchangeCoupon(this.keyword)
				uni.hideLoading()
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					return
				}
				uni.$u.toast(res.msg)
			})
		}
	}
</script>

<style scoped lang="scss">
.top-bg {
	width: 750rpx;
	height: 396rpx;
	background: $theme;
}

.panel {
	width: 686rpx;
	height: 592rpx;
	background: #FFFFFF;
	box-shadow: 0 8rpx 8rpx 0 rgba(0,0,0,0.04);
	border-radius: 16rpx;

	position: absolute;
	left: 32rpx;
	top: 220rpx;

	padding-left: 32rpx;
	padding-right: 32rpx;
}

.title {
	font-weight: 600;
	font-size: 32rpx;
	color: $theme;
}

.m-t-52 {
	margin-top: 52rpx;
}

.input-box {
	width: 622rpx;
	height: 88rpx;
	background: #F5F5F5;
	border-radius: 16rpx;
	padding: 0 32rpx;
}

.input-style {
    flex: 1;
    height: 100%;
    padding: 0 20rpx 0 5rpx;
    font-size: 24rpx;
    color: #333;

	// background: red;
}


.placeholder {
	font-weight: 600;
	font-size: 28rpx;
	color: #CCCCCC;
}

.tip-title {
	font-weight: 600;
	font-size: 16px;
	color: #999999;
}

.content-font {
	font-weight: 400;
	font-size: 24rpx;
	color: #999999;
}
</style>