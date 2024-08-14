<!-- 带搜索框的导航栏 -->
<!-- 用例 -->
<!-- <kr-search-navbar :fixed="true" placeholder="请输入店铺名称" :keyword="searchText" @update:keyword="updateSearchText" @search="onSearch"></kr-search-navbar> -->
<template>
    <u-navbar :leftIconSize="showBackBtn ? '40rpx' : '0'" :autoBack="showBackBtn" :fixed="fixed" :border="false"
        @leftClick="leftClick">

        <template #center>
            <view class="search-bar">
                <!-- <u-search searchIconSize="44" :placeholder="placeholder"  :value="keyword" :bgColor="'transparent'" clearabled
                    :actionStyle="actionStyle" @search="search"></u-search> -->

                <u-icon name="search" size="40" color="#ccc"></u-icon>
                <input class="search-input" maxlength="50" placeholder-class="placeholder" type="text" :value="keyword" @input="onInput" :placeholder="placeholder"
                    confirm-type="search" @confirm="onSearch" />
                <u-icon v-if="keyword.length" name="close-circle-fill" size="30" color="#ccc"
                    @click.stop="onClear"></u-icon>
                <view class="search-btn" @click="onSearch">搜索</view>


            </view>
        </template>
    </u-navbar>
</template>

<script>
import { throttle } from '@/common/debounce.js';

export default {
    name: 'kr-search-navbar',
    props: {
        /************** 二次封装追加自定义属性 *************************/

        // 输入框的初始化内容
        keyword: { //搜索栏关键词
            type: String,
            default: ''
        },

        // 是否显示返回按钮
        showBackBtn: {
            type: Boolean,
            default: true
        },

        // 搜索按钮颜色
        btnColor: {
            type: String,
            default: '#2A8151'
        },


        /*************** u-navbar 原有自带属性 **********************/
        // 是否固定在顶部
        fixed: {
            type: Boolean,
            default: false
        },

        /*************** u-search 原有自带属性 **********************/
        // 占位提示文字
        placeholder: {
            type: String,
            default: uni.$u.props.search.placeholder
        },
    },
    data() {
        return {

        }
    },
    computed: {
        actionStyle() {
            return { color: this.btnColor }
        },
    },

    methods: {
        // 返回按钮
        leftClick() {
            // 如果配置了autoBack，自动返回上一页
            this.$emit('leftClick')
            // if(this.autoBack) {
            //     uni.navigateBack()
            // }
        },
        // 点击搜索
        // search(e) {
        //     console.log('~~~~', e)
        //     this.$emit('search', e)
        // },

        // 点击清除
        // clear() {
        //     this.$emit('update:keyword', '');
        //     this.$emit('clear')
        // },
        onClear() {
            this.$emit('update:keyword', '');
        },
        onSearch: throttle(function () {
            // console.log('~~~~onSearch', this.keyword)
            if (this.keyword.length > 0) {
                this.$emit('search', this.keyword);
            }
        }),
        onInput(e) {
            this.$emit('update:keyword', e.detail.value.trim());
        }

    }
}
</script>

<style>
.placeholder {
    font-weight: 400;
    font-size: 24rpx;
    color: rgba(153, 153, 153, 0.5);
}
</style>
<style scoped lang="scss">
.search-bar {
    width: 444rpx;
    height: 64rpx;
    border-radius: 64rpx;
    background: #F6F6F6;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 20rpx;

    position: relative;
    left: -60rpx;
}

.search-input {
    flex: 1;
    height: 100%;
    padding: 0 20rpx 0 5rpx;
    font-size: 24rpx;
    color: #333;
}

.search-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60rpx;
    height: 48rpx;
    margin-left: 16rpx;
    // background: $theme;
    // background: linear-gradient(155deg, #66BC25 0%, #49980D 100%);
    // border-radius: 80rpx;
    font-weight: 600;
    font-size: 24rpx;
    
    color: $theme;
}
</style>