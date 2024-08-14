<!-- 自定义单列picker，此组件只是单列，可根据需求改布局或多列 -->
<!-- 用例 -->
<!-- <kr-picker :show="showPicker" title="选择门店" :list="storeList" :currentIndex="currentIndex" @change="changeHandler" @confirm="confirmHandler" @close="closeHandler" @open="openHandler"></kr-picker> -->
<template>
    <kr-sheet-panel :show="show" :title="title" height="824rpx" @close="closeHandler" @open="openHandler">
        <!-- slot -->
        <view class="flex flex-col flex-items-center">
            <!-- picker-view文档：https://uniapp.dcloud.net.cn/component/picker-view.html -->
            <!--    indicatorStyle：picker选中条的样式 -->
            <!--    value: 列选中项的索引值，多列是个数组-->
            <view class="picker-view pos-relative">
                <picker-view class="w-100% h-100%" :immediate-change="true" :indicator-style="indicatorStyle" :value="[currentIndex]" @change="changeHandler">
                    <!-- 单列 -->
                    <picker-view-column>
                        <view class="picker-item" v-for="(item, index) in list" :key="index">{{ item.label }}</view>
                    </picker-view-column>
                </picker-view>

                <!-- 加载中 -->
                <view v-show="loading" class="pos-absolute l-0 t-0 w-100% h-100%" style="background: #ffffffcc;" @tap.stop.prevent>
                    <view class="pos-cc">
                        <u-loading-icon mode="circle" :show="loading" size="40"></u-loading-icon>
                    </view>
                </view>
            </view>
        
            <!-- 确定按钮 -->
            <view class="picker-confirm" @tap="confirmHandler">确定</view>
        </view>

    </kr-sheet-panel>
</template>

<script>
export default {
    props: {
        // 是否展示
        show: {
            type: Boolean,
            default: false
        },
        // 是否加载中
        loading: {
            type: Boolean,
            default: false
        },
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 默认选中索引
        currentIndex: {
            type: Number,
            default: 0
        },
        // 数据列表
        list: {
            type: Array,
            default: () => {
                // 数据结构
                return [
                    // { label: '选项1' },
                    // { label: '选项1' },
                ]
            }
        },
        
    },
    data() {
        return {

        }
    },
    computed: {
        // 当前picker选中的背景样式
        indicatorStyle() {
            return `height: ${uni.$u.getPx('96rpx')}px; background: #F4F2F2; z-index: 0;`
        },
    },
    methods: {
        closeHandler() {
            this.$emit('close')
        },
        openHandler() {
            this.$emit('open')
        },
        
        /**
         * 数据改变
         * @param {*} e 
         * 
         * e的数据结构
         * {
         *   detail: {
         *     value: [] //有多少列就返回多少个索引
         *   }
         * }
         */
        changeHandler(e) {
            // console.log('~~~~~', e)
            this.$emit('change', e.detail.value[0])
        },
        confirmHandler() {
            this.$emit('confirm')
        },
    }
}
</script>

<style scoped lang="scss">
.picker-view {
    width: 686rpx;
    height: 472rpx;
    margin-top: 80rpx;
    margin-bottom: 16rpx;
}

.picker-item {
    line-height: 100rpx;
    text-align: center;
    font-weight: 600;
    font-size: 28rpx;
    color: #333333;
}

// 确定按钮
.picker-confirm {
    width: 622rpx;
    height: 96rpx;
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