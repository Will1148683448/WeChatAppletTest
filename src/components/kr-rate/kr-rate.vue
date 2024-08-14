<!-- 用例 -->
<!-- changeRate监听score改变 -->
<!-- <kr-rate :minCount="0" size="70" activeColor="#2A8151" count="5" :value="score" @changeRate="changeRate" :allowHalf="true"></kr-rate> -->
<template>
	<view class="" :style="{'--icon-wrap--half':iconWrapWidth  + 'px' }">
		<u-rate active-color="#FA3534" inactive-color="#b2b2b2" :value="value" :count="count" :disabled="disabled"
			:readonly="readonly" :size="size" :inactiveColor="inactiveColor" :activeColor="activeColor" :gutter="gutter"
			:minCount="minCount" :allowHalf="allowHalf" :activeIcon="activeIcon" :inactiveIcon="inactiveIcon"
			:touchable="touchable" @change="change"></u-rate>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared'
		},
		name: 'kr-rate',
		props: {
			// 用于v-model双向绑定选中的星星数量
			value: {
				type: [String, Number],
				default: uni.$u.props.rate.value
			},
			// 要显示的星星数量
			count: {
				type: [String, Number],
				default: uni.$u.props.rate.count
			},
			// 是否不可选中
			disabled: {
				type: Boolean,
				default: uni.$u.props.rate.disabled
			},
			// 是否只读
			readonly: {
				type: Boolean,
				default: uni.$u.props.rate.readonly
			},
			// 星星的大小，单位px
			size: {
				type: [String, Number],
				default: uni.$u.props.rate.size
			},
			// 未选中时的颜色
			inactiveColor: {
				type: String,
				default: uni.$u.props.rate.inactiveColor
			},
			// 选中的颜色
			activeColor: {
				type: String,
				default: uni.$u.props.rate.activeColor
			},
			// 星星之间的间距，单位px
			gutter: {
				type: [String, Number],
				default: uni.$u.props.rate.gutter
			},
			// 最少能选择的星星个数
			minCount: {
				type: [String, Number],
				default: uni.$u.props.rate.minCount
			},
			// 是否允许半星
			allowHalf: {
				type: Boolean,
				default: uni.$u.props.rate.allowHalf
			},
			// 选中时的图标(星星)
			activeIcon: {
				type: String,
				default: uni.$u.props.rate.activeIcon
			},
			// 未选中时的图标(星星)
			inactiveIcon: {
				type: String,
				default: uni.$u.props.rate.inactiveIcon
			},
			// 是否可以通过滑动手势选择评分
			touchable: {
				type: Boolean,
				default: uni.$u.props.rate.touchable
			},
		},
		methods: {
			change(e) {
				this.$emit('changeRate', e)
			}
		},
		computed: {
			// 在原有mode上增加了custom模式，如果使用时配置的custom就会使用自定义指示器
			iconWrapWidth() {
				return this.size * 10 / 36
			}
		},

	}
</script>

<style scoped lang="scss">
	::v-deep .u-rate__content__item__icon-wrap--half {
		width: var(--icon-wrap--half) !important
	}
</style>