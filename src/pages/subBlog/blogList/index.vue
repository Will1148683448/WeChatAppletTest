<!-- 列表 -->
<template>
	<view>
		<!-- kr-navbar默认fixed=false -->
		<kr-navbar :fixed="true" title="博客"></kr-navbar>
		<!-- mescroll-uni默认fixed=true -->
		<kr-mescroll :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop+'px'" @up="upCallback">
			<!-- cell -->
			<blog-cell v-for="(item, index) in dataList" :key="index" :item="item" @tap.native="gotoDetail(item)"></blog-cell>

			<!-- 测试时不传item参数使用 -->
			<!-- <blog-cell v-for="(item, index) in dataList" :key="index" @tap="gotoDetail(item)"></blog-cell> -->
			
		</kr-mescroll>
	</view>
</template>

<script>
import BlogCell from '@/pages/subBlog/components/blog-cell/index.vue'
import {getBlogList} from '@/api/blog.js'

export default {
	components: {
		BlogCell
	},
	data() {
		return {
			// 列表
			dataList: [],
			// 加载状态
			loadOptions: {
				status: '',
				size: 0,
				totalSize: 0,
			}
		}
	},
	computed: {
	},
	onLoad(options) {
		this.blogType = options.blogType || 1
	},
	methods: {
		async upCallback(page) {
			this.loadOptions = {
				status: 'loading'
			}
			let res = await getBlogList(page.num, this.blogType)
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

		gotoDetail(item) { 
			// console.log('~~~~~~gotoDetail')
			uni.navigateTo({ url: '/pages/subBlog/blogDetail/index?id=' + item.informationId })
		}
	}
}
</script>

<style lang="scss">
page {
	background: $page-bg-white;
}
</style>
<style scoped lang="scss">

</style>