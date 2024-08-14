<!-- 手机号验证码登录 -->
<template>
    <view>
        <!-- 背景图 -->
        <image class="bg" :src="IMG_URL + 'login/bg.png'" mode="" />
        <!-- logo -->
        <image class="logo" :src="IMG_URL + 'login/logo.png'" mode="" />
        <!-- 底部面板 -->
        <view class="bottom-container top-radius flex flex-col p-h-48 p-t-48">
            <text class="font-size-32 black-333 fw-600 m-t-16">手机号</text>
            <!-- 手机号输入框 -->
            <input class="input-bg m-t-16" maxlength="11" placeholder="请输入手机号（请使用线下诊断预留手机号）" v-model="phone" type="text"
                placeholder-class="placeholder">

            <text class="font-size-32 black-333 fw-600 m-t-48">验证码</text>
            <!-- 验证码输入框 -->
            <view class="pos-relative input-bg m-t-16">
                <input class="code" maxlength="4" placeholder="请输入验证码" type="text" v-model="code"
                    placeholder-class="placeholder">
                <view class="code-card" style="" @click.stop="">
                    <view class="line">
                    </view>
                    <view class="code-tit">
                        <u-code changeText="Xs" endText="重新发送" :seconds="seconds" @end="end" @start="start" ref="uCode"
                            @change="codeChange"></u-code>
                        <text class="" @tap="getCode">{{ tips }}</text>
                    </view>
                </view>
            </view>

            <!-- 用户协议和隐私政策 -->
            <check-agreement class="m-t-32" :checked.sync="checkedAgreement"></check-agreement>

            <!-- 背景色按钮 -->
            <view class="primary-button m-t-80" @click="onLoginBtnPressed">
                <text class="m-l-8">登录</text>
            </view>
        </view>
    </view>
</template>

<script>
import CheckAgreement from '../components/check-agreement/check-agreement.vue'
import {
    sendCode,
    phoneLogin,
} from '@/api/login.js';
export default {
    components: {
        CheckAgreement
    },
    data() {
        return {
            //手机号
            phone: '',
            // 验证码
            code: '',

            // 获取验证码默认文本
            tips: '获取验证码',
            // refCode: null,
            seconds: 60,

            // 是否选中checkbox
            checkedAgreement: false,
        }
    },

    methods: {
        // 点击重新发送
        codeChange(text) {
            this.tips = text;
        },
        // 点击发送验证码
        async getCode() {
            if (!/^1[0-9]{10,10}$/.test(this.phone)) {
                uni.$u.toast('手机格式不对')
                return
            }
            if (this.$refs.uCode.canGetCode) {
                this.$refs.uCode.start();
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码'
                })
                let res = await sendCode({
                    phone: this.phone
                })
                uni.hideLoading();
                // 这里此提示会被this.start()方法中的提示覆盖
                uni.$u.toast(res.msg)
                // 通知验证码组件内部开始倒计时
                this.$refs.uCode.start();
            } else {
                uni.$u.toast('倒计时结束后再发送');
            }
        },
        end() {
            // uni.$u.toast('倒计时结束');
        },
        start() {
            // uni.$u.toast('倒计时开始');
        },
        async onLoginBtnPressed() {
            if (!this.checkedAgreement) {
                uni.$u.toast('请勾选协议')
                return
            }
            if (!/^1[0-9]{10,10}$/.test(this.phone)) {
                uni.$u.toast('手机格式不对')
                return
            }
            if (!this.code) {
                uni.$u.toast('请输入验证码')
                return
            }
            uni.showLoading({
                title: '正在登录'
            })
            let res = await phoneLogin({
                code: this.code,
                phone: this.phone
            })
            if (res.status == 1) {
                uni.hideLoading();
                uni.setStorage({
                    key: "token",
                    data: res.data.token,
                    success() {
                        setTimeout(() => {
                            uni.$u.toast(res.msg)
                        }, 100)
                        uni.reLaunch({
                            url: "/pages/tabHome/index"
                        })
                    }
                })
            } else {
                uni.hideLoading();
                uni.$u.toast(res.msg)
            }

        },
    },
}
</script>

<style>
.placeholder {
    font-size: 28rpx;
    color: #CCCCCC;
}
</style>
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

.bottom-container {
    position: absolute;
    top: calc(100vh - 840rpx);
    left: 0;
    z-index: 10;
    width: 750rpx;
    height: 840rpx;
    background: #FFFFFF;
}

.p-h-48 {
    padding: 0 48rpx;
}

.p-t-48 {
    padding-top: 48rpx;
}

.m-t-48 {
    margin-top: 48rpx;
}

.m-t-80 {
    margin-top: 80rpx;
}

// 输入框背景
.input-bg {
    width: 654rpx;
    height: 96rpx;
    background: #F3F6F7;
    border-radius: 16rpx;

    padding: 0 32rpx;

    display: flex;
    align-items: center;
}

.code {
    // padding: 28rpx 262rpx 28rpx 32rpx;
    width: 360rpx;
    height: 40rpx;
    font-size: 28rpx;
    background: #F3F6F7;
    // border-radius: 16rpx 16rpx 16rpx 16rpx;
    // opacity: 1;
}

.line {
    margin-right: 32rpx;
    width: 0rpx;
    height: 40rpx;
    opacity: 1;
    border-right: 1rpx solid $theme;
}

.code-card {
    display: flex;
    align-items: center;
    position: absolute;
    top: 28rpx;
    right: 32rpx;
    z-index: 999;
}

.code-tit {
    color: $theme;
    font-size: 28rpx;
}
</style>