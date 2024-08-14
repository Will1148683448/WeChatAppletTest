<!-- 底部pop面板 -->
<!-- 层级：z-index: 10075，最好放到根view下，否则可能会被遮挡 -->
<!-- 用例 -->
<!-- <kr-sheet-panel :show="show" :title="title" height="824rpx" @close="closeHandler" @open="openHandler"> -->
<template>
    <u-popup :show="show" :round="round" mode="bottom" @close="closeHandler" @open="openHandler">
        <view class="flex flex-col flex-items-center" :style="{ height: panelHeight }">
            <!-- 关闭按钮 -->
            <view class="panel-close" @tap.stop="closeHandler">
                <kr-image :src="IMG_URL + 'common/ic_close.png'" width="32rpx" height="32rpx"
                :fade="false"></kr-image>
            </view>
            <!-- 标题 -->
            <text class="panel-title m-t-40">{{ title }}</text>
            <slot></slot>
        </view>
    </u-popup>
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
        // 高度
        height: {
            type: [String, Number],
            default: '500rpx'
        },
        // 圆角
        round: {
            type: [String, Number],
            default: '16rpx'
        }
    },
    data() {
        return {

        }
    },
    computed: {
        panelHeight() {
            return uni.$u.getPx(this.height) + 'px'
        },
    },
    methods: {
        closeHandler(e) {
            this.$emit('close', e)
        },

        openHandler(e) {
            this.$emit('open', e)
        },
    }
}
</script>

<style scoped lang="scss">

.panel-title {
	font-weight: 600;
    font-size: 32rpx;
    color: #333333;
    line-height: 40rpx;
}
.m-t-40 {
	margin-top: 40rpx;
}

.panel-close {
    padding: 20rpx;
	position: absolute;
	top: 26rpx;
	right: 12rpx;
    z-index: 999;
    // background: red;
}
</style>