<!-- mescroll-uni 二次封装组件 -->
<!-- 分页例子： -->
<!-- <kr-mescroll :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop+'px'" @up="upCallback"> -->
<!-- 只有下拉 -->
<!-- <kr-mescroll :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop+'px'" :upUse="false" @down="downCallback"> -->
<template>
	<mescroll-uni :fixed="fixed" @init="mescrollInit" :top="top" :bottom="bottom" :down="downOption" :up="upOption"
		@up="upCallback" @down="downCallback" @scroll="scroll">
		<!-- cell -->
		<slot></slot>
		<!-- 无数据cell -->
		<kr-nodata v-if="showEmpty" tip="暂未有内容~" :top="nodataTop" :bottom="nodataBottom"></kr-nodata>

	</mescroll-uni>

</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import Config from '@/config'

	/**
	 * mescroll-uni 嵌在页面某个区域的下拉刷新和上拉加载组件, 如嵌在弹窗,浮层,swiper中...
	 * @property {Object} down 下拉刷新的参数配置
	 * @property {Object} up 上拉加载的参数配置
	 * @property {Object} i18n 国际化的参数配置
	 * @property {String, Number} top 下拉布局往下的偏移量 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx, 百分比则相对于windowHeight)
	 * @property {Boolean, String} topbar 偏移量top是否加上状态栏高度, 默认false (使用场景:取消原生导航栏时,配置此项可留出状态栏的占位, 支持传入字符串背景,如色值,背景图,渐变)
	 * @property {String, Number} bottom 上拉布局往上的偏移量 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx, 百分比则相对于windowHeight)
	 * @property {Boolean} safearea 偏移量bottom是否加上底部安全区的距离, 默认false (需要适配iPhoneX时使用)
	 * @property {Boolean} fixed 是否通过fixed固定mescroll的高度, 默认true
	 * @property {String, Number} height 指定mescroll的高度, 此项有值,则不使用fixed. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx, 百分比则相对于windowHeight)
	 * @property {Boolean} bottombar 底部是否偏移TabBar的高度 (仅在H5端的tab页生效)
	 * @property {Boolean} disableScroll 是否禁止滚动, 默认false
	 * @event {Function} init 初始化完成的回调 
	 * @event {Function} down 下拉刷新的回调
	 * @event {Function} up 上拉加载的回调 
	 * @event {Function} emptyclick 点击empty配置的btnText按钮回调
	 * @event {Function} topclick 点击回到顶部的按钮回调
	 * @event {Function} scroll 滚动监听 (需在 up 配置 onScroll:true 才生效)
	 * @example <mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback"> ... </mescroll-uni>
	 */
	export default {
		mixins: [MescrollMixin],
		components: {

		},
		props: {
			/************** 二次封装追加自定义属性 *************************/

			/**
			 * ==加载状态说明==: 
			 * loading：加载中
			 * error：加载失败
			 * success：下拉加载成功
			 * successBySize：分页加载成功
			 * empty：加载成功无数据
			 */
			loadOptions: {
				type: Object,
				default: () => {
					return {
						status: '', //当前状态 loading|error|success|successBySize|empty
						size: 0, //当前分页数据条数
						totalSize: 0, //数据总条数
					}
				}
			},

			// 覆盖down.auto
			downAuto: {
				type: Boolean,
				default: true
			},

			// 覆盖up.use
			upUse: {
				type: Boolean,
				default: true
			},

			// 覆盖up.noMoreSize
			upNoMoreSize: {
				type: Number,
				default: 5
			},
			// 是否显示toTop（必须是fixed模式）
			showToTop: {
				type: Boolean,
				default: false
			},
			// 覆盖up.toTop
			toTop: {
				type: Object,
				default: null
			},
			// 顶部内边距
			nodataTop: {
				type: String,
				default: '20vh'
			},
			// 低部内边距
			nodataBottom: {
				type: String,
				default: '20vh'
			},

			/************** mescroll-uni 原有自带属性 *************************/
			down: {
				type: Object,
				default: () => {
					return { //下拉配置参数
						offset: 80, //下拉多少距离刷新，默认80
						auto: true, //初始化后是否自动调用下拉刷新
					}
				}
			},
			up: {
				type: Object,
				default: () => {
					return {
						// use: false, //是否使用上拉加载
						auto: false, // 不自动加载
						offset: 50,
						noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
						textNoMore: '暂无更多数据',
						toTop: {
							src: '', //去掉默认的回到顶部按钮
						},
						empty: {
							use: false, //默认false
							// icon: 'https://cdn.uviewui.com/uview/swiper/swiper3.png', //配置网络图片
							// icon: '', //null无法屏蔽图片，需要配置空字符串
							icon: `${Config.StaticWebUrl}/image/common/no_data.png`,
							tip: "暂未有内容~",

							// btnText: "刷新按钮", //是否显示刷新按钮
							// fixed: true,
							// top: "100rpx",
							// zIndex: 99
						},
						onScroll: true //是否开启scroll 滚动监听
					}
				}
			},
			top: [String, Number],
			topbar: [Boolean, String], //偏移量top是否加上状态栏高度, 默认false
			bottom: [String, Number], //上拉布局往上的偏移量
			safearea: Boolean, //偏移量bottom是否加上底部安全区的距离, 默认false 
			fixed: {
				type: Boolean,
				default: false
			},
			height: [String, Number], //指定mescroll的高度, 此项有值,则不使用fixed.
			bottombar: { //底部是否偏移TabBar的高度 (仅在H5端的tab页生效)
				type: Boolean,
				default: true
			},
			disableScroll: Boolean //是否禁止滚动, 默认false
		},
		data() {
			return {
				// 自定义暂无数据
				canShowEmpty: false,
			}
		},
		computed: {

			downOption() {
				return Object.assign(this.down, {
					auto: this.downAuto
				})
			},
			upOption() {
				let obj = Object.assign(this.up, {
					use: this.upUse,
					noMoreSize: this.upNoMoreSize
				})
				// 如果需要展示toTop
				if (this.showToTop) {
					// 需要自定义toTop就使用自定义的
					if (this.toTop) {
						obj = Object.assign(obj, {
							toTop: this.toTop
						})
					} else { //不需要自定义就使用默认的
						obj = Object.assign(obj, {
							toTop: {
								offset: 400
							}
						})
					}
				}

				return obj
			},
			// 是否显示kr-nodata组件
			showEmpty() {
				return this.canShowEmpty && this.loadOptions.status == 'empty'
			},
		},
		watch: {
			loadOptions: {
				handler(data, odata) {
					// console.log('~~~~~~watch loadOptions', data?.status)
					if (data?.status == 'loading') {

					} else if (data?.status == 'success') {
						this.mescroll.endSuccess()
					} else if (data?.status == 'successBySize') {
						if (!this.upUse) {
							this.mescroll.endSuccess()
						} else {
							this.mescroll.endBySize(data.size, data.totalSize);
						}
					} else if (data?.status == 'error') {
						this.mescroll.endErr();
					} else if (data?.status == 'empty') {
						this.canShowEmpty = true
						this.mescroll.endSuccess(0)
					}
				},
				immediate: true
			}
		},
		methods: {
			// 下拉刷新
			downCallback() {
				// console.log('~~~~~~downCallback')
				this.$emit('down')

				// 调用上拉加载
				if (this.upUse) {
					this.mescroll.resetUpScroll();
				}

			},

			// 上拉加载
			upCallback(page) {
				// console.log('~~~~~~upCallback', page)
				this.$emit('up', page)
			},
			//滚动监听(需在 up 配置 onScroll:true 才生效)
			scroll(e) {

				this.$emit('scroll', e)
			},
			/******************* 以下方法需要设置ref ********************************* */
			/**
			 * 调用方式：
			 * 1.定义ref="mescroll-list"
			 * 2.在mounted方法中获取 this.mescroll = this.$refs['mescroll-list'].getMescrollObj()
			 */

			//获取mescroll对象
			getMescrollObj() {
				return this.mescroll
			},
			//刷新列表
			resetUpScroll() {
				this.mescroll.resetUpScroll()
			},
			triggerDownScroll() {
				this.mescroll.triggerDownScroll()
			},
			refreshScroll() {
				if (this.upUse) {
					this.resetUpScroll()
				} else {
					this.triggerDownScroll()
				}
			},
			//滚动到指定位置
			scrollTo(y, time = 300) {
				this.mescroll.scrollTo(y, time)
			}

		}
	}
</script>

<style scoped lang="scss"></style>