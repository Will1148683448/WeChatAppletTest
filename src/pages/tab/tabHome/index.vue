<!-- 首页 -->
<template>
	<kr-mescroll ref="mescroll-list" :showToTop="true" :loadOptions="loadOptions" :fixed="true" top="0" nodataTop="0" nodataBottom="0" @up="upCallback" @down="downCallback">
		<!-- 轮播图 -->
		<kr-swiper :list="bannerList" height="625rpx" indicatorStyle="bottom: 66rpx" :indicator="true" @change="swiperChange"
			@click="swiperClick"></kr-swiper>

		<!-- 搜索框 -->
		<search-bar class="search-bar" placeholder="请输入"></search-bar>

		<!-- 分类 -->
		<view class="m-t-48">
			<!-- 背景图 -->
			<!-- <image class="bg" :src="IMG_URL + 'home/bg.png'" mode="scaleToFill" /> -->

			<!-- 分类容器 -->
			<view class="category-row">
				<category-item :title="item.title" :icon="item.icon" :url="item.url" v-for="(item, index) in categoryList" :key="index"></category-item>
			</view>	
		</view>

		<!-- 业务数据分页列表 -->
		<!-- <store-cell v-for="(item, index) in dataList" :key="index" :item="item" @tap.native="gotoDetail(item)"></store-cell> -->
	</kr-mescroll>
</template>

<script>

import Config from '@/config/index.js';
import categoryItem from "./components/category-item/category-item.vue"
import searchBar from "./components/search-bar/search-bar.vue"
// import storeCell from "@/components/tabHome/store-cell/index.vue"
import { getBannerList, getHomeDataList } from '@/api/home.js'
import { getLocation } from '@/modules/Location/index.js'
export default {
	components: {
		categoryItem,
		searchBar,
		// storeCell
	},
	data() {
		return {
			// 轮播图数组
			bannerList: [],

			// 业务数据列表
			dataList: [],

			//分类配置
			categoryList: [
				{
					title: '品牌故事',
					icon: `${Config.StaticWebUrl}/image/home/category_0.png`,
					url: '/pages/subBlog/blogList/index?blogType=1',
				},
				{
					title: '推荐商品',
					icon: `${Config.StaticWebUrl}/image/home/category_1.png`,
					url: '/pages/subBlog/blogList/index?blogType=2',
				},
				{
					title: '评价',
					icon: `${Config.StaticWebUrl}/image/home/category_2.png`,
					url: '/pages/subOrder/evaluateOrder/index',
				},
				{
					title: '优惠券选择测试',
					icon: `${Config.StaticWebUrl}/image/home/category_2.png`,
					url: '/pages/subOrder/confirmOrder/index',
				}
			],

			// 加载状态
			loadOptions: {
				status: '',
				size: 0,
				totalSize: 0,
			}
		}
	},
	mounted() {
		// console.log("~~~home");

		/***************测试************** */
		return
		uni.navigateTo({
			// url: "/pages/subLogin/authLogin/index"
			// url: "/pages/subOrder/confirmOrder/index"
			// url: "/pages/test/index"
		});
	},
	async onShow() {
		console.log('onShow');

		// 获取位置
        let res = await getLocation(false);
		console.log('~~~~getLocation', res)
		if (res.status == 1) {
			console.log('~~~res location', res);
			this.$store.commit('setLocation', res.data.coordinate)

			// 刷新附近的门店
			this.addressCoordinates = `${res.data.coordinate.longitude},${res.data.coordinate.latitude}`;

			//刷新列表
			this.$refs['mescroll-list'].resetUpScroll()
		}
        // console.log('onShow', this.$store.state);
    },
	methods: {

		// 测试使用
		// delayByMillisecond(data, millisecond = 1500) {
		// 	return new Promise(resolve => {
		// 		setTimeout(() => {
		// 			resolve(data);
		// 		}, millisecond)
		// 	})
		// },
		// 加载轮播图
		async getSwiperList() {
			// 测试使用
			// let data = await this.delayByMillisecond([
			// 	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			// 	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
			// 	'https://cdn.uviewui.com/uview/swiper/swiper1.png',
			// ])
			// this.bannerList = data


			let res = await getBannerList()
			if (res.status == 1) {
				this.bannerList = res.data.map(item => {
					return {
						...item,
						url: item.imgUrl,
					}
				});
	
			}
		},
		
		// 下拉刷新
		downCallback() {
			// uni.showLoading({
			// 	title: '',
			// 	mask: true
			// });
			// this.loadOptions = {
			// 	status: 'loading'
			// }
			let res = Promise.all([this.getSwiperList()]);
			res.finally(() => {
				// uni.hideLoading();

				// console.log('~~~~~loadData', this.recommendStoreList.length)

			});
		},

		// 上拉加载
		async upCallback(page) {

			this.loadOptions = {
				status: 'loading'
			}
			let params = {
				addressCoordinates: this.addressCoordinates || '',
				page: page.num
			}
			let res = await getHomeDataList(params)
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				this.loadOptions = {
					status: 'error'
				}
				return
			}
			if (page.num == 1) {
				this.dataList = []
			}
			this.dataList = this.dataList.concat(res.data.list)
			if (this.dataList.length == 0) {
				this.loadOptions = {
					status: 'empty'
				}
			} else {
				this.loadOptions = {
					status: 'successBySize',
					size: res.data.size,
					totalSize: res.data.totalSize
				}
			}
		},

		// 轮播图切换回调
		swiperChange(e) {
			// console.log('~~~swiperChange', e)
		},
		// 点击轮播图
		swiperClick(index) {
			console.log('~~~swiperClick', index)

			let item = this.bannerList[index]
			let linkUrl = item.linkUrl
			if (linkUrl && linkUrl.length > 0) {
				uni.navigateTo({ url: linkUrl })
			}
		},

		// 跳转业务详情页
		gotoDetail(item) {
			// console.log('~~~~~~tap')
			// uni.navigateTo({ url: '/pages/subTeaStore/teaStoreDetail/index?shopId=' + item.shopId })
		},
	},

}
</script>

<style scoped lang="scss">

.search-bar {
	position: absolute;
	z-index: 2;
	left: 32rpx;
	top: 570rpx;
}

.category-row {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding: 0 48rpx;
}

</style>