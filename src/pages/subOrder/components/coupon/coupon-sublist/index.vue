<!-- 优惠券列表 -->
<template>
	<kr-mescroll ref="mescroll-list" :nodataTop="nodataTop" nodataBottom="0" :downAuto="downAuto" :loadOptions="loadOptions" :fixed="fixed"
		:top="top" @up="loadData">
		<template v-if="notDisableCell">
			<!-- 非禁用cell -->
			<coupon-cell :couponListType="couponListType" :choose="isChooseCell" :selectItem="selectItem" v-for="(item, index) in dataList" :item="item" :key="index" @clickCell="clickCell"></coupon-cell>
		</template>
		<template v-else>
			<!-- 禁用cell -->
			<coupon-cell-disable :couponListType="couponListType" :choose="isChooseCell" v-for="(item, index) in dataList" :item="item" :key="index"></coupon-cell-disable>
		</template>

		<!-- 安全区域 -->
		<view :style="{height: bottom}"></view>
	</kr-mescroll>
</template>

<script>
	import {
		getCanUseCouponsList,
		getCanotUseCouponsList,
		getUserCouponList,
	} from '@/api/coupon.js'
	import CouponCell from '../coupon-cell/index.vue'
	import CouponCellDisable from '../coupon-cell-disable/index.vue'
	import {
		time_mixins
	} from '@/common/mixins/time_mixins.js';
	export default {
		mixins: [time_mixins],
		components: {
			CouponCell,
			CouponCellDisable
		},
		props: {
			/**************** kr-mescroll相关属性配置 *******************/

			// 是否刷新列表数据
			refresh: {
				type: Boolean,
				default: false,
			},
			// 是否自动下拉
			downAuto: {
				type: Boolean,
				default: true
			},
			//距离顶部高度（单位任意）
			top: {
				type: [String, Number],
				default: '0px'
			},
			//距离低部高度（单位任意）
			bottom: {
				type: [String, Number],
				default: '0px'
			},
			// 是否固定在顶部
			fixed: {
				type: Boolean,
				default: false
			},
			// 无数据距离顶部距离样式
			nodataTop: {
				type: String,
				default: '20vh'
			},

			/**************** 数据 *******************/
			// 优惠券列表类型 0：未使用 1：已使用 2：已过期 3:可用 4:不可用
			couponListType: {
				type: Number,
				default: 0
			},
			//预约应付价格
			payAmount: {
				type: Number,
				default: 0
			},
			//选中的优惠券
			selectItem: {
				type: Object,
				default: null,
			},
		},

		data() {
			return {
				// 优惠券列表
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
			// 是否选择优惠券cell
			isChooseCell() {
				return this.couponListType == 3 || this.couponListType == 4
			},
			// 是否非禁用cell
			notDisableCell() {
				return this.couponListType == 0 || this.couponListType == 3
			}
		},

		watch: {
			// 切换tabbar是否刷新
			refresh: {
				handler(ndata, odata) {
					// 如果tab从未显示切换到显示需要刷新
					if (ndata && ndata != odata) {
						this.refreshList()
					}
				},
				immediate: true
			}
		},
		mounted() {},
		methods: {
			clickCell(item) {
				let flag = !item.checked
				item.checked = flag

				// console.log('~~~~111', item.checked)
				// 刷新列表
				this.dataList = this.dataList.map(item1 => {
					if (item.couponId == item1.couponId) {
						item1.checked = flag
						// console.log('~~~~2222', item1.checked)
					} else {
						item1.checked = false
					}
					return item1
				})
				// console.log('~~~~333', item.checked?item:null)
				this.$emit('onChecked', item.checked?item:null)
			},
			//加载数据
			async loadData(page) {
				this.loadOptions = {
					status: 'loading'
				}

				let res = null
				if (this.couponListType == 3) { //可用优惠券
					res = await getCanUseCouponsList(this.payAmount)
				} else if (this.couponListType == 4) { //不可用优惠券
					res = await getCanotUseCouponsList(this.payAmount)
				} else {
					let params = {
						page: page.num,
						type: this.couponListType
					}
					res = await getUserCouponList(params)

				}
				// console.log('~~~~~2222', res)
				if (res.status != 1) {
					uni.$u.toast(res.msg)
					this.loadOptions = {
						status: 'error'
					}
					return
				}

				if (this.couponListType == 3 || this.couponListType == 4) { //可用优惠券和不可用优惠券不用分页
					if (this.couponListType == 3) { //可用优惠券需要设置默认选中
						// 设置选中的优惠券
						this.dataList = res.data.map(item=>{
							if (this.selectItem && item.couponId == this.selectItem.couponId) {
								item.checked = true
							} else {
								item.checked = false
							}
							return item
						})
					} else { //不可用优惠券
						this.dataList = res.data
					}
				} else {
					if (page.num == 1) {
						this.dataList = [];
					}
					this.dataList = this.dataList.concat(res.data.list)
				}

				if (this.dataList.length == 0) {
					this.loadOptions = {
						status: 'empty'
					}
				} else {
					if (this.couponListType == 3 || this.couponListType == 4) { //可用或不可用优惠券不用分页
						this.loadOptions = {
							status: 'successBySize',
							size: this.dataList.length,
							totalSize: this.dataList.length
						}
						this.$emit('dataSize', {
							couponListType: this.couponListType,
							size: this.dataList.length
						})
					} else {
						console.log('~~~~~1111111111')
						this.loadOptions = {
							status: 'successBySize',
							size: res.data.size,
							totalSize: res.data.totalSize
						}
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