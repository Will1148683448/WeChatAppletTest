<!-- 首页 -->
<template>
	<view class="flex flex-col flex-items-center" @click.stop="jumpTo">
		<view class="p-10">
            <image class="icon" :src="icon" mode="scaleToFill" />
        </view>
		<text class="title m-t-8">{{ title }}</text>
	</view>
</template>

<script>

export default {
    name: 'category-item',
    props: {
        title: String, //标题
        icon: String, //图标
        url: String, //跳转地址
    },
	data() {
		return {
		}
	},
	methods: {
		jumpTo() {
            uni.navigateTo({ url: this.url })
        }
	},

}
</script>

<style scoped lang="scss">
.p-10 {
    padding: 10rpx;
}
.icon {
    width: 116rpx;
    height: 116rpx;
}
.title {
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 28rpx;
    color: #000000;
    font-style: normal;
    text-transform: none;
}
</style>