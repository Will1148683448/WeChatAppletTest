<!-- 自定义微信-获取手机号-登录按钮 -->
<template>
    <button open-type="getPhoneNumber" class="primary-button" @getphonenumber="getphonenumber">
        <text>手机号快捷登录</text>
    </button>
</template>

<script>
export default {
    props: {

    },
    methods: {
        getphonenumber(e) {
            this.$emit('getphonenumber', e)
        }
    }
}

</script>

<style scoped lang="scss">

.primary-button {
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

.ic-wechat {
    width: 32rpx;
    height: 32rpx;
}

.m-l-8 {
    margin-left: 8rpx;
}
</style>