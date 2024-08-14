<!-- 订单列表 -->
<template>
	<kr-mescroll ref="mescroll-list" :downAuto="false" :loadOptions="loadOptions" :fixed="fixed" :top="top" bottom="0"
		@up="loadData">
		<order-cell v-for="(item, index) in dataList" :key="index" :item="item" @refresh="refreshList"></order-cell>
		<!-- 底部占位 -->
		<view style="height: 32rpx;"></view>
	</kr-mescroll>
</template>

<script>
	import {
		getOrderList
	} from '@/api/order.js'
	import OrderCell from '../order-cell/order-cell.vue'

	export default {
		components: {
			OrderCell
		},
		props: {
			// 是否刷新列表数据
			refresh: {
				type: Boolean,
				default: false,
			},
			//距离顶部高度（单位px）
			top: {
				type: String,
				default: '0px'
			},
			// 订单类型 0：全部 1：待使用 2：使用中 3：待评价
			orderType: {
				type: Number,
				default: 0
			},
			// 是否固定在顶部
			fixed: {
				type: Boolean,
				default: false
			},
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
				}
			}
		},
		watch: {
			refresh: {
				handler(ndata, odata) {
					// console.log('~~~~~refresh', ndata, odata)
					if (ndata) {
						this.refreshList()
					}
				},
				immediate: true
			}
		},

		mounted() {
			// 监听刷新通知
			uni.$on('refreshOrderList', () => {
				console.log('~~~~~~refreshOrderList', this.refresh)
				if (this.refresh) {
					this.refreshList()
				}
			})
		},
		methods: {
			//加载数据
			async loadData(page) {
				this.loadOptions = {
					status: 'loading'
				}
				let params = {
					currentPage: page.num,
					orderType: this.orderType
				}
				let res = await getOrderList(params)
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
				// console.log('~~~~~~~this.loadOptions', )
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

			// 刷新列表
			refreshList() {
				console.log('~~~~~~refreshList')
				this.$nextTick(() => {
					this.$refs['mescroll-list'].resetUpScroll()
				})
			},
		},

	}
</script>

<style scoped lang="scss">

</style>