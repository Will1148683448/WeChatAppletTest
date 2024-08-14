<!-- 自定义时间picker，支持多列 -->
<!-- 用例 -->
<!-- dateList是二维数组[[],[],[]]，currentIndex是数组[0,0,0] -->
<!-- <kr-date-picker :show="showPicker" title="选择时间" :list="dateList" :currentIndex="currentIndex" @change="changeHandler" @confirm="confirmHandler" @close="closeHandler" @open="openHandler"></kr-date-picker> -->
<template>
    <kr-sheet-panel :show="show" :title="title" height="824rpx" @close="closeHandler" @open="openHandler">
        <!-- slot -->
        <view class="flex flex-col flex-items-center">
            <!-- picker-view文档：https://uniapp.dcloud.net.cn/component/picker-view.html -->
            <!--    indicatorStyle：picker选中条的样式 -->
            <!--    value: 列选中项的索引值，多列是个数组-->
            <view class="picker-view pos-relative">
                <picker-view class="w-100% h-100%" :immediate-change="true" :indicator-style="indicatorStyle" :value="currentIndexArr" @change="changeHandler">
                    <!-- 多列 -->
                    <picker-view-column v-for="(colItem, colIndex) in list" :key="colIndex">
                        <view class="picker-item" v-for="(item, index) in colItem" :key="index">{{ item.label }}</view>
                    </picker-view-column>
                </picker-view>
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
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 默认选中索引
        currentIndexArr: {
            type: Array,
            default: () => {
                return [
                    // 0,
                    // 1,
                    // 2,
                ]
            }
        },
        // 数据列表
        list: {
            type: Array,
            default: () => {
                // 数据结构
                return [
                    // [
                    //     // { label: '选项1' },
                    //     // { label: '选项1' },
                    // ],
                    // [
                    //     // { label: '选项1' },
                    //     // { label: '选项1' },
                    // ]
                ]
            }
        },
        
    },
    data() {
        return {
            changeIndexArr: null, // 当前picker改变时的索引，是个数组
        }
    },
    computed: {
        // 当前picker选中的背景样式
        indicatorStyle() {
            return `height: ${uni.$u.getPx('96rpx')}px; background: #F4F2F2; z-index: 0;`
        },
    },
    watch: {
        currentIndexArr: {
            handler(data) {
                console.log('~~~~watch11111111', data)
                this.changeIndexArr = data
            },
            immediate: true
        }
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
            console.log('~~~~~kr-date-picker changeHandler', e)
            this.changeIndexArr = e.detail.value
            this.$emit('change', e)
        },
        confirmHandler() {
            console.log('~~~~~kr-date-picker confirmHandler', this.changeIndexArr)
            // 返回每列选中的数据, [列1选中数据对象, 列2选中数据对象, ...]
            let resList = this.list.map((item, index)=> {
                return item[this.changeIndexArr[index]]
            })
            this.$emit('confirm', resList)
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