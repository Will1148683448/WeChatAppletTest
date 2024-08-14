<!-- 顶部tab切换 -->
<!-- 用例 -->
<!-- <kr-tabs :fixed="tabBarFixed" :top="tabBarTop" :current="currentTab" :list="tabList" height="90rpx" lineWidth="140rpx"
					@click="clickTab"></kr-tabs> -->
<template>
    <!-- 由于u-navbar的默认层级z-index:11，所以这个默认层级设置为10 -->
    <view class="container" :class="fixed?'kr-tab-fixed':'kr-tab-sticky'" :style="{ paddingTop: paddingTop }">
        <u-tabs :list="list" :lineColor="lineColor" :lineHeight="lineHeight" :lineWidth="lineWidth"
            :scrollable="scrollable" :current="current" @click="clickHandler" @change="changeHandler" :itemStyle="allItemStyle"
            :activeStyle="activeStyle" :inactiveStyle="inactiveStyle"></u-tabs>

        <!-- 线 -->
        <view class="line"></view>
    </view>

</template>

<script>
export default {
    name: 'kr-tabs',
    props: {
        height: {
            type: [String, Number],
            default: '80rpx'
        },
        // tabs标签数组
        list: {
            type: Array,
            default: []
        },
        // 滑块颜色
        lineColor: {
            type: String,
            default: '#2A8151'
        },
        // 滑块长度
        lineWidth: {
            type: [String, Number],
            default: '84rpx'
        },
        // 滑块高度
        lineHeight: {
            type: [String, Number],
            default: '8rpx'
        },
        // 菜单是否可滚动
        scrollable: {
            type: Boolean,
            default: false
        },

        // 菜单item的样式(设置行高)
        itemStyle: {
            type: [String, Object],
            default: () => {
                return {
                    background: '#fff',
                } 
            }
        },

        // 菜单选择中时的样式
        activeStyle: {
            type: [String, Object],
            default: () => {
                return {
                    fontWeight: 600,
                    fontSize: '28rpx',
                    color: '#333333'
                }
            }
        },
        // 菜单非选中时的样式
        inactiveStyle: {
            type: [String, Object],
            default: () => {
                return {
                    fontWeight: 400,
                    fontSize: '28rpx',
                    color: '#999999'

                }
            }
        },

        // 当前选中标签的索引
        current: {
            type: [Number, String],
            default: 0
        },

        // 是否固定在顶部
        fixed: {
            type: Boolean,
            default: false
        },

        top: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {

        }
    },
    computed: {
        paddingTop() {
            return uni.$u.getPx(this.top) + 'px'
        },
        allItemStyle() {
            return Object.assign(this.itemStyle, {height: uni.$u.getPx(this.height) + 'px'})
        }
    },
    methods: {
        // 点击一个标签(索引是item.index)
        clickHandler(item) {
            // console.log(item)
            this.$emit('click', item)
        },
        // 改变索引(索引是item.index)
        changeHandler(item) {
            this.$emit('change', item)
        },
    }
}

</script>

<style lang="scss" scoped>
.kr-tab-fixed {
    // position: fixed;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;

    width: 100%;

}
.kr-tab-sticky {
    // position: fixed;
    position: sticky;
    z-index: 10;
    top: 0;
    left: 0;

    width: 100%;

}
</style>