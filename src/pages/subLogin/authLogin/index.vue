<!-- 获取微信绑定手机号登录 -->
<template>
    <view>
        <!-- 背景图 -->
        <image class="bg" :src="IMG_URL + 'login/bg.png'" mode="" />
        <!-- logo -->
        <image class="logo" :src="IMG_URL + 'login/logo.png'" mode="" />
        <!-- logo_title -->
        <image class="logo-title" :src="IMG_URL + 'login/logo_title.png'" mode="" />

        <!-- 底部面板 -->
        <view class="bottom-container top-radius flex flex-col p-h-64 p-t-48">
            <text class="font-big">
                您好～
            </text>
            <text class="font-big">
                欢迎来到天福茗茶荟
            </text>
            <text class="font-size-28 gray-999 m-t-16">
                茶可以和身心，可以和社会;可以和两岸，也可以和天下;以茶为媒，可达大道
            </text>

            <!-- 微信获取绑定手机号登录 -->
            <view class="m-t-104">
                <kr-wx-phonelogin-button @getphonenumber="wxLogin"></kr-wx-phonelogin-button>
            </view>

            <!-- 用户协议和隐私政策 -->
            <check-agreement class="m-t-32" :checked.sync="checkedAgreement"></check-agreement>

            <!-- 填充占位 -->
            <view class="flex-1"></view>
            <!-- 底部小字 -->
            <view class="flex flex-justify-center m-b-84">
                <text class="font-size-24 gray-999">
                    未注册用户,验证登录后将自动注册并登录
                </text>
            </view>
        </view>
    </view>
</template>

<script>
import CheckAgreement from '../components/check-agreement/check-agreement.vue'
import { wxPhoneLogin } from '@/modules/wxLogin/index.js'
export default {
    components: {
        CheckAgreement
    },
    data() {
        return {
            // 是否选中checkbox
            checkedAgreement: false,
        }
    },

    methods: {
        //微信登录按钮
        async wxLogin(e) {
            if (!this.checkedAgreement) {
                uni.$u.toast('请勾选协议')
                return
            }
            wxPhoneLogin(e)
        },
    },
}
</script>

<style scoped lang="scss">
.bg {
    width: 750rpx;
    height: 986rpx;
}

.logo {
    width: 544rpx;
    height: 150rpx;

    position: absolute;
    left: 100rpx;
    top: calc((100vh - 840rpx - 150rpx) / 2);
    z-index: 1;
}

.logo-title {
    width: 516rpx;
    height: 92rpx;

    position: absolute;
    left: 116rpx;
    top: calc((100vh - 840rpx) / 2 + 110rpx);
    z-index: 1;
}

.bottom-container {
    position: absolute;
    top: calc(100vh - 840rpx);
    left: 0;
    z-index: 10;
    width: 750rpx;
    height: 840rpx;
    background: #FFFFFF;

    .font-big {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 800;
        font-size: 56rpx;
        color: #000000;
        // line-height: 33px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }
}

.p-h-64 {
    padding: 0 64rpx;
}

.p-t-48 {
    padding-top: 48rpx;
}

.m-t-16 {
    margin-top: 16rpx;
}

.m-t-104 {
    margin-top: 104rpx;
}

.m-b-84 {
    margin-bottom: 84rpx;
}
</style>