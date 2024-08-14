<template>
    <view class="select-box">
        <view class="select" v-if="!checked" @click="tapSelect()">

        </view>
        <view class="" v-if="checked" @click="tapSelect()">
            <image style="width: 26rpx;height: 26rpx;display: flex;margin-right: 16rpx;"
                :src="IMG_URL + 'login/checked_pitch.png'" mode=""></image>
        </view>
        <view class="select-tit">
            已阅读并同意<text style="color: #009944;" @click="loginAgreement()">《用户注册协议》</text>与<text
                style="color: #009944;" @click="privacyAgreement()">《隐私政策》</text>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        // 是否选中checkbox
        checked: {
            type: Boolean,
            default: false
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
        // 登录协议
        loginAgreement() {
            uni.navigateTo({
                url: "/pages/subLogin/loginAgreement/index"
            })
        },
        // 隐私协议
        privacyAgreement() {
            uni.navigateTo({
                url: "/pages/subLogin/privacyAgreement/index"
            })
        },
        // 选中协议
        tapSelect() {
            this.$emit('update:checked', !this.checked)
        },
    }
}
</script>

<style lang="scss" scoped>
.select-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 654rpx;
}

.select-tit {
    display: flex;
    font-size: 24rpx;
    color: #999999;
}

.select {
    display: flex;
    width: 26rpx;
    height: 26rpx;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    opacity: 1;
    border: 2rpx solid #999999;
    margin-right: 16rpx;
}
</style>