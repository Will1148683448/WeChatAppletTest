<template>
    <view class="p-32">
        <view class="border-line flex p-b-32">
            <view class="icon">
                <kr-image clip :src="item.headImg" width="220" height="160" radius="8rpx"></kr-image>
            </view>

            <view class="flex flex-col flex-justify-between w-445">
                <text class="title text-cut-2">{{ item.title }}</text>
                <text class="date">{{ item.createDate }}</text>
            </view>
        </view>

    </view>
</template>

<script>
import imageCompress_mixins from '@/common/mixins/imageCompress_mixins.js'

export default {
    name: 'blog-cell',
    mixins: [imageCompress_mixins],
    props: {
        item: {
            type: Object,
            default: () => {
                return {
                    "createDate": "2024-04-17 10:04:32",
                    "headImg": "https://cdn.uviewui.com/uview/swiper/swiper1.png",
                    "informationId": 1,
                    "title": "关于天福茗茶的小故事《小故事名字叫天福茗茶》天福茗茶天福茗福茗茶天福茗福茗茶天福茗"
                }
            }
        },
    },
    data() {
        return {

        }
    },
    mounted() {
        // console.log('~~~~~~', this.item)
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.p-32 {
    padding: 32rpx 32rpx 0 32rpx;
}

.p-b-32 {
    padding-bottom: 32rpx;
}

.icon {
    width: 220rpx;
    height: 160rpx;
    // background: red;
    margin-right: 20rpx;

    image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
    }
}

.w-445 {
    width: 445rpx;
}

.title {
    font-weight: 600;
    font-size: 28rpx;
    color: #333333;
}

.date {
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
}

.border-line {
    border-bottom: #E5E5E5 solid 1rpx;
}
</style>