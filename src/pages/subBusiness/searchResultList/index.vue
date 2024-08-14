<!-- 茶室门店搜索列表 -->
<template>
	<view>
		<kr-search-navbar :fixed="true" placeholder="请输入店铺名称" :keyword.sync="searchText" @search="onSearch"></kr-search-navbar>
		<kr-mescroll ref="mescroll-list" :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop + 'px'" :downAuto="false" @up="upCallback">
			<!-- 业务数据列表 -->
			<!-- <store-cell v-for="(item, index) in dataList" :key="index" :item="item"
				@tap.native="gotoDetail(item)"></store-cell> -->

		</kr-mescroll>
	</view>
</template>

<script>
// import storeCell from "@/components/tabHome/store-cell/index.vue"
import { searchDataList } from "@/api/home.js"

export default {
	components: {
		// storeCell
	},
	data() {
		return {
			// 品牌故事列表
			dataList: [],
			// 加载状态
			loadOptions: {
				status: '',
				size: 0,
				totalSize: 0,
			},
			searchText: ''
		}
	},
	onLoad(options) {
		this.searchText = options.key
	},
	mounted() {
		this.mescroll = this.$refs['mescroll-list'].getMescrollObj()
		// console.log('~~~~', this.mescroll)
		this.mescroll.resetUpScroll()
	},
	methods: {
		onSearch(key) {
			// console.log('~~~~onSearch111', key)
			this.searchText = key.trim()
			this.mescroll.resetUpScroll()
		},
        // 上拉加载
		async upCallback(page) {
			this.loadOptions = {
				status: 'loading'
			}
			let params = {
				shopName: this.searchText,
				page: page.num
			}
			let res = await searchDataList(params)
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				this.loadOptions = {
					status: 'error'
				}
				return
			}
			if (page.num == 1) {
				this.dataList = [];
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

		// 跳转业务详情页
		gotoDetail(item) {
			// uni.navigateTo({ url: '/pages/subTeaStore/teaStoreDetail/index?shopId=' + item.shopId })
		},
	}
}
</script>

<style scoped></style>