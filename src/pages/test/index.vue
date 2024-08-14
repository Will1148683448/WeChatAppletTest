<!-- 首页 -->
<template>
	<view>
		
		<kr-navbar :fixed="true" title="测试"></kr-navbar>

		<view class="m-t-300"></view>

		<view class="title">你好</view>
		<view class="bold">你好</view>
		<view class="light">你好</view>
		<view class="aaaa">abcd</view>
		<view class="title">abcd</view>

		<!-- iconfont -->
		<!-- <text class='iconfont sort' style='font-size: 40rpx;'>&#xec1d;</text> -->
		<!-- <span class="iconfont icon-erji" style="color: red;"></span> -->

		<button
			open-type=""
			hover-class="button-hover"
			@click="jumpTo"
		>
			跳转subpackage页面
		</button>
	</view>
</template>

<script>
// import mySwiper from "@/components/tabHome/swiper/index.vue"
// import search from "@/components/tabHome/search/index.vue"
// import homeList from "@/components/tabHome/homeList/index.vue"
export default {
	data() {
		return {
		}
	},
	components: {
		// mySwiper,
		// search,
		// homeList
	},
	methods: {
		jumpTo() {
			uni.navigateTo({
				url: '/pages/subBlog/blogList/index'
			})
		}
	},

}
</script>

<style scoped>
.title {
	font-size: 40rpx;
	color: #2A8151;
}
.bold {
	font-family: 'DINPro' !important;;
	font-weight: bold;
	font-size: 40rpx;
	color: #2A8151;
}
.light {
	font-family: 'DINPro-Light';
	font-size: 40rpx;
	color: #2A8151;
}
.aaaa {
	font-family: "DINSKI CASUAL CONDENSED" !important;
	/* font-weight: bold; */
	font-size: 40rpx;
	color: #2A8151;

	font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>