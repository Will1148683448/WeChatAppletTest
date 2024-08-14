<!-- 支持网络图片裁剪、切圆角 -->
<!-- 用例 -->
<!-- <kr-image class="status-icon" clip :src="IMG_URL+'userCenter/'+statusIcon" width="124rpx" height="124rpx" radius="0" :fade="false"></kr-image> -->
<template>
    <u--image :bgColor="bgColor" :src="imgUrl" :mode="mode" :width="width" :height="height" :shape="shape" :radius="radius" :showLoading="showLoading" :showError="showError" :fade="fade" :lazyLoad="lazyLoad" @tap="onPreviewImage">
        <!-- 加载中菊花 -->
        <template v-slot:loading>
            <u-loading-icon></u-loading-icon>
        </template>
        <!-- 加载失败 -->
        <template #error>
            <view style="font-size: 24rpx;">加载失败</view>
        </template>
    </u--image>
</template>

<script>
import imageCompress_mixins from '@/common/mixins/imageCompress_mixins.js'
export default {
    name: 'kr-image',
    mixins: [imageCompress_mixins],
    props: {
         /*********************** 自定义属性 *******************************/
        //  是否启用云对象存储图片裁剪
        clip: {
            type: Boolean,
            default: false
        },
        // 预览图片地址
        previewImgs: {
            type: Array,
            default: ()=>{
                return []
            }
        },
        // 预览图片当前索引
        previewCurrent: {
            type: Number,
            default: 0,
        },
        /*********************** u--image原有属性 *******************************/
        // 图片地址
        src: {
            type: String,
            default: ''
        },
        // 图片的裁剪模式，值可参考：https://uniapp.dcloud.net.cn/component/image.html#image
        mode: {
            type: String,
            default: 'aspectFill' //常用属性 aspectFill(长边裁剪) | scaleToFill(拉伸填充) | aspectFit(长边能显示全)
        },
        // 宽度，单位任意
        width: {
            type: [String, Number],
            default: 300
        },
        // 高度，单位任意
        height: {
            type: [String, Number],
            default: 225
        },
        // 图片形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'square'
        },
        // 圆角，单位任意
        radius: {
            type: [String, Number],
            default: 0
        },
        // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
        lazyLoad: {
            type: Boolean,
            default: true
        },
        // 开启长按图片显示识别微信小程序码菜单
        showMenuByLongpress: {
            type: Boolean,
            default: true
        },
        // 是否显示加载中的图标或者自定义的slot
        showLoading: {
            type: Boolean,
            default: true
        },
        // 加载中的图标，或者小图片
        // loadingIcon: {
        //     type: String,
        //     default: 'photo'
        // },
        // 是否显示加载错误的图标或者自定义的slot
        showError: {
            type: Boolean,
            default: true
        },
        // 加载失败的图标，或者小图片(可选值参考：https://uviewui.com/components/icon.html)
        // errorIcon: {
        //     type: String,
        //     default: 'error-circle'
        // },
        // 只支持网络资源，只对微信小程序有效
        webp: {
            type: Boolean,
            default: true
        },
        // 是否需要淡入效果
        fade: {
            type: Boolean,
            default: true
        },
        // 搭配fade参数的过渡时间，单位ms
        duration: {
            type: [String, Number],
            default: 500
        },
        // 背景颜色，用于深色页面加载图片时，为了和背景色融合
        bgColor: {
            type: String,
            default: '#f3f4f6'
        }
    },
    computed: {
        //获取图片地址
        imgUrl() {
            // 如果支持裁剪并切是网络地址，则进行裁剪
            if (this.clip && this.src.includes('http')) {
                return this.cosCompressImg_mixin(this.src, this.width, this.height)
            }
            return this.src
        }
    },
    methods: {
        // 预览图片
		onPreviewImage() {
			if (this.previewImgs.length == 0) {
                return
            }
			uni.previewImage({
                urls: this.previewImgs,
                current: this.current,
                loop: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>