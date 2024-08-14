<!-- 微信分享按钮 -->
<!-- 需要配合 '@/common/mixins/wxShare_mixins.js'一起使用 -->
<!-- 用例 -->
<!-- <kr-share-button class="m-t-48" buttonClass="primary-button radius-16">立即邀请好友</kr-share-button> -->
<!-- hover-class 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果 -->
<template>
    <button :class="buttonClass" class="btn" hover-class="none" open-type="share" :data-obj="shareInfo">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: 'kr-share-button',
        props: {
            // 分享内容
            shareInfo: {
                type: Object,
                default: () => {
                    return {
                        // title: '',
                        // imageUrl: '',
                        // path: '',
                    }
                }
            },
            // 按钮样式class
            buttonClass: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style lang="scss" scoped>
// 去掉按钮边框样式
.btn { 
    border-color: transparent;
}
.btn::after{   
    border: none;
}

</style>