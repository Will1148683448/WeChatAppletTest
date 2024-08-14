<template>
	<kr-sheet-panel :show="show" title="优惠券" height="1320rpx" @close="closeHandler" @open="openHandler">

		<view class="coupon-box w-100%">
			<!-- tab 默认高度80rpx -->
			<kr-tabs v-if="show" :current="currentTab" lineWidth="244rpx" height="108rpx" :list="tabList" :activeStyle="{
                fontWeight: 600,
                fontSize: '32rpx',
                color: '#333333'
            }" :inactiveStyle="{
                    fontWeight: 400,
                    fontSize: '32rpx',
                    color: '#999999'
                }" @click="clickTab" @change="onTabChange"></kr-tabs>

			<!-- 可用 -->
			<coupon-sublist v-if="show" v-show="currentTab == 0" :couponListType="3" :payAmount="payAmount" bottom="400rpx" nodataTop="50rpx" @dataSize="dataSizeCallback" :selectItem="tempSelectItem" @onChecked="onSelectItem"></coupon-sublist>
			<!-- 不可用 -->
			<coupon-sublist v-if="show" v-show="currentTab == 1" :couponListType="4" :payAmount="payAmount" bottom="400rpx" nodataTop="50rpx" @dataSize="dataSizeCallback"></coupon-sublist>

			<!-- 确定按钮 -->
			<view class="footer">
				<view class="picker-confirm" @tap="confirmHandler">确定</view>
			</view>
		</view>
	</kr-sheet-panel>
</template>

<script>
	import CouponSublist from '../coupon-sublist/index.vue'
	export default {
		components: {
			CouponSublist
		},
		props: {
			// 是否展示
			show: {
				type: Boolean,
				default: false
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
				// 缓存选中的优惠卷对象
				tempSelectItem: null,

				// 当前tab
				currentTab: 0,
				tabList: [{
					name: '可用优惠券(0)',
				}, {
					name: '不可用优惠券(0)',
				}]
			}
		},
		watch: {
			show: {
				handler(ndata, odata) {
					if (ndata) {
						this.currentTab = 0;
						this.tempSelectItem = this.selectItem
					}
				},
				immediate: true
			}
		},
		methods: {
			onSelectItem(item) {
				this.tempSelectItem = item
			},
			closeHandler() {
				this.$emit('close')
				this.tempSelectItem = null
			},
			openHandler() {
				this.$emit('open')
			},

			confirmHandler() {
				let obj = null
				if(this.tempSelectItem){
					obj = {...this.tempSelectItem}
				}
				this.$emit('confirm', obj)
			},

			clickTab(item) {
				// console.log(item.index)
				this.currentTab = item.index
			},
			onTabChange(item) {
				// console.log(item.index)
			},

			// 优惠券列表长度回调
			dataSizeCallback(data) {
				let {
					couponListType,
					size
				} = data
				if (couponListType == 3) {
					this.tabList[0].name = `可用优惠券(${size})`
				} else if (couponListType == 4) {
					this.tabList[1].name = `不可用优惠券(${size})`
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.coupon-box {
		background: $page-bg-gray;
		height: 100%;
		// background: red;
	}

	.footer {
		background: #fff;
		padding: 16rpx 32rpx;
		width: 100%;
		height: 188rpx;

		position: fixed;
		left: 0;
		bottom: 0;
	}

	// 确定按钮
	.picker-confirm {
		width: 686rpx;
		height: 88rpx;
		background: $theme;
		border-radius: 8rpx;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		font-size: 28rpx;
		color: #fff;
	}
</style>