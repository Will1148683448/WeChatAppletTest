<!-- 首页 -->
<template>
    <view class="search-bar">
        <!-- 放大镜图标 -->
        <u-icon name="search" size="50" color="#ccc"></u-icon>
        <!-- 输入框 -->
        <input class="search-input" maxlength="50" placeholder-class="placeholder" type="text" v-model="searchText"
            :placeholder="placeholder" confirm-type="search" @confirm="onSearch" />
        <!-- 清除按钮 -->
        <u-icon v-if="searchText.length" name="close-circle-fill" size="40" color="#ccc" @click.stop="onClear"></u-icon>
        <!-- 搜索按钮 -->
        <view class="search-btn" @click="onSearch">搜索</view>
    </view>
</template>

<script>
import { throttle } from '@/common/debounce.js';

export default {
    name: 'search-bar',
    props: {
        // 占位提示文字
        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        },
    },
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        searchBtnPressed() {
            this.searchText = this.searchText.trim()
            if (this.searchText == '') {
                return
            }
            // this.searchText = ''
            uni.navigateTo({ url: `/pages/subBusiness/searchResultList/index?key=${this.searchText}` })
        },

        onClear() {
            // this.$emit('update:keyword', '');
            this.searchText = ''
        },
        onSearch: throttle(function () {
            // console.log('~~~~onSearch', this.keyword)
            this.searchText = this.searchText.trim()
            if (this.searchText == '') {
                return
            }
            // this.searchText = ''
            uni.navigateTo({ url: `/pages/subBusiness/searchResultList/index?key=${this.searchText}` })
        }),
        // onInput(e) {
        //     this.$emit('update:keyword', e.detail.value.trim());
        // }
    },

}
</script>

<style>
.placeholder {
    font-weight: 400;
    font-size: 28rpx;
    color: rgba(153, 153, 153, 0.5);
}
</style>
<style scoped lang="scss">
.search-bar {
    width: 686rpx;
    height: 112rpx;
    border-radius: 16rpx;
    background: #ffffff;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 48rpx;

    // position: relative;
    // left: -60rpx;
}

.search-input {
    flex: 1;
    height: 100%;
    padding: 0 20rpx 0 5rpx;
    font-size: 28rpx;
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
    font-size: 28rpx;

    color: $theme;
}
</style>