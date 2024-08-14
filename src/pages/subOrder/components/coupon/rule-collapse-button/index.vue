<!-- 展开折叠优惠券规则按钮 -->
<template>
    <view class="flex flex-items-center"  @tap.stop="click">
        <text class="title" :style="{color: color}">{{ title }}</text>
        <u-icon size="20" :color="color" :name="iconName"></u-icon>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String, 
            default: '标题'
        },
        //是否已折叠
		collapse: {
            type: Boolean, 
            default: true
        },
        color: {
            type: String, 
            default: '#999999'
        }
    },
    computed: {
        iconName() {
            return this.collapse ? 'arrow-right' : 'arrow-down'
        }
    },
    methods: {
        click() {
            let status = !this.collapse
            this.$emit('click', status)
            this.$emit('update:collapse', status);
        }
    }
}
</script>
<style lang="scss" scoped>
.title {
    font-weight: 600;
    font-size: 24rpx;

    margin-right: 8rpx;
}
</style>