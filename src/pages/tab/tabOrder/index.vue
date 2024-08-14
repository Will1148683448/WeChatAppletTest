<!-- 订单列表 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="订单列表" :showBackBtn="false"></kr-navbar>
		<!-- tab 默认80rpx -->
		<kr-tabs :current="currentTab" :fixed="true" :top="wxPaddingTop+'px'" :list="tabList" @click="clickTab" @change="onTabChange"></kr-tabs>

		<!-- i 列表类型 0：全部 1：待使用 2：使用中 3：待评价 -->
		<template v-for="i in [0, 1, 2, 3]">
			<order-list :ref="`refOrderList${i}`" v-show="currentTab == i" :refresh="currentTab == i" :fixed="true" :top="totalPaddingTop+'px'" :orderType="i+1"></order-list>
		</template>
	</view>
</template>

<script>
import OrderList from './components/order-list/order-list.vue'

export default {
	components: {
		OrderList
	},
	data() {
		return {
			tabList: [
				{
					name: '全部',
				}, {
					name: '待使用',
				}, {
					name: '使用中'
				}, {
					name: '待评价'
				}
			],
			currentTab: 0, //0：全部 1：待使用 2：使用中 3：待评价
		}
	},
	computed: {
		// navbar+tabbar 高度(单位px)
		totalPaddingTop() {
			return uni.upx2px(80) + this.wxPaddingTop
		}
	},
	onTabItemTap(e) {
		console.log('~~~~onTabItemTap', e)
		if (this.isNotFirstIn) {
			this.$nextTick(() => {
				this.$refs[`refOrderList${this.currentTab}`][0].refreshList()
			})
		}
	},
	mounted() {
		console.log('~~~~mounted')
		this.isNotFirstIn = true
	},
	methods: {
		clickTab(item) {
			// console.log(item.index)
			this.currentTab = item.index
		},
		onTabChange(item) {
			// console.log(item.index)
		},
	},

}
</script>

<style scoped lang="scss">

</style>