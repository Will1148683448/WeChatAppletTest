<!-- 用例 -->
<!-- 返回，黑色title -->
<!-- <kr-navbar :fixed="true" title="推荐商品"></kr-navbar> -->
<!-- 白色返回，背景透明，无title -->
<!-- <kr-navbar :fixed="true" title=" " leftIconColor="#fff" :bgColor="'transparent'"></kr-navbar> -->
<!-- 指定背景色，白色返回和title -->
<!-- <kr-navbar :fixed="true" title="我要反馈" leftIconColor="#fff" titleColor="#fff" :bgColor="'#2A8151'"></kr-navbar> -->
<!-- 分享页直接进入例子： 根据onLoad的options.q判断是否来自分享页，自行控制返回按钮跳转路径 -->
<!-- <kr-navbar :fixed="true" title="优惠券" :autoBack="false" @leftClick="leftClick"></kr-navbar> -->
<template>
    <!-- u-navbar的默认层级z-index:11 -->
    <u-navbar :title="title" :leftIconSize="showBackBtn?'40rpx':'0'" :leftIconColor="leftIconColor" :autoBack="autoBack" :fixed="fixed" :border="false" :titleStyle="customTitleStyle" :bgColor="bgColor" @leftClick="leftClick">
    </u-navbar>
</template>

<script>
export default {
    name: 'kr-navbar',
    props: {
        /************** 二次封装追加自定义属性 *************************/
        // 是否显示返回按钮
        showBackBtn: {
			type: Boolean,
			default: true
		},

        /*************** u-navbar 原有自带属性 **********************/
        // 标题
		title: {
			type: [String, Number],
			default: ''
		},
        titleColor: {
			type: String,
			default: '#000000'
		},
        // 标题的样式，对象或字符串
		titleStyle: {
			type: Object,
			default: () => {
                return {
                    fontSize: '34rpx',
                    fontWeight: '500'
                 }
            }
		},
        // 是否固定在顶部
		fixed: {
			type: Boolean,
			default: false
		},
        // 左侧返回图标的颜色
		leftIconColor: {
			type: String,
			default: uni.$u.props.navbar.leftIconColor
		},
        // 背景颜色(透明设置transparent)
		bgColor: {
			type: String,
			default: uni.$u.props.navbar.bgColor
		},
        // 点击左侧区域(返回图标)，是否自动返回上一页
		autoBack: {
			type: Boolean,
			default: true
		},
    },
    data() {
        return {
            
        }
    },
    computed: {
        customTitleStyle() {
            return Object.assign(this.titleStyle, {color: this.titleColor})
        },

        autoBackFlag() {
            if (!this.showBackBtn || !this.autoBack) {
                return false
            }
            return true
        }
    },
    methods: {
        leftClick() {
            // 如果配置了autoBack，自动返回上一页
            this.$emit('leftClick')
            // if(this.autoBack) {
            //     uni.navigateBack()
            // }
        },
    }
}
</script>

<style scoped lang="scss">

</style>