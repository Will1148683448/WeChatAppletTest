<!-- uview2的u-swiper二次封装组件 -->
<!-- 用例 -->
<!-- 1.默认只需要设置高度 -->
<!-- <kr-swiper :list="bannerList" height="600rpx" :indicator="false" @change="swiperChange"
			@click="swiperClick"></kr-swiper> -->
<!-- 2.使用自定义指示器 -->
<!-- <kr-swiper :list="bannerList" height="700rpx" indicatorMode="custom" indicatorStyle="right: 32rpx; bottom: 88rpx" @click="swiperClick"></kr-swiper> -->
<template>
    <!-- <view :style="{'--indicator-right':indicatorRight, '--indicator-bottom':indicatorBottom}"> -->
        <u-swiper bgColor="#eee" :height="height" :radius="radius" :imgMode="imgMode" :list="list" :showTitle="showTitle" :keyName="keyName" :indicator="indicator" :indicatorMode="indicatorMode" :indicatorStyle="indicatorStyle" :circular="circular" :autoplay="autoplay" :interval="interval" :displayMultipleItems="displayMultipleItems" @change="change" @click="click">
            <!-- 自定义指示器 -->
            <template v-slot:[indicatorSolt]>
                <view class="indicator-num">
                    <text class="indicator-num__text">{{ currentNum + 1 }}/{{ list.length }}</text>
                </view>
            </template>
        </u-swiper>
    <!-- </view> -->
</template>

<script>
export default {
    // options: {
    //     styleIsolation: 'shared'
    // },
    /**
     * 以下属性可参考uview组件库的uview-ui/components/u-swiper/props.js，未设置的属性大家在使用时可自行添加
     */
    props: {
        // 组件高度(rpx)
        height: {
            type: [String, Number],
            default: 260
        },

        // 组件圆角，数值或带单位的字符串
        radius: {
            type: [String, Number],
            default: 0
        },

        // 图片的裁剪模式，值可参考：https://uniapp.dcloud.net.cn/component/image.html#image
        imgMode: {
            type: String,
            default: 'aspectFill' //常用属性 aspectFill(长边裁剪) | scaleToFill(拉伸填充) | aspectFit(长边能显示全)
        },

        /**************** 数据相关配置 ********************/
        // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
		list: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 是否显示标题，要求数组对象中有title属性
        showTitle: {
            type: Boolean,
            default: false
        },
        // list数组中指定对象的目标属性名
        keyName: {
            type: String,
            default: 'url'
        },

        /**************** 指示器相关配置 ********************/
        // 是否显示面板指示器
        indicator: {
            type: Boolean,
            default: true
        },
        // 指示器非激活颜色
        indicatorActiveColor: {
            type: String,
            default: '#FFFFFF'
        },
        // 指示器的激活颜色
        indicatorInactiveColor: {
            type: String,
            default: uni.$u.props.swiper.indicatorInactiveColor //默认rgba(255, 255, 255, 0.35)
        },
        // 指示器模式，line-线型，dot-点型 custom-自定义
        indicatorMode: {
            type: String,
            default: 'line'
        },
        // 指示器样式，可通过bottom，left，right进行定位
        indicatorStyle: {
            type: [String, Object],
            default: null //指示器样式，可通过bottom，left，right进行定位 比如："right: 20px"
        },
        // indicatorRight: {
        //     type: String,
        //     default: '32rpx'
        // },
        // indicatorBottom: {
        //     type: String,
        //     default: '66rpx'
        // },

        // 播放到末尾后是否重新回到开头
        circular: {
            type: Boolean,
            default: true
        },

        // 是否自动切换
        autoplay: {
            type: Boolean,
            default: true
        },
        // 滑块自动切换时间间隔
        interval: {
            type: [String, Number],
            default: uni.$u.props.swiper.interval //默认3000毫秒
        },
    },
    data() {
        return {
            currentNum: 0,
            /******* 测试用数据结构 ******** */
            // 纯图片
            list1: [
                'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                'https://cdn.uviewui.com/uview/swiper/swiper1.png',
            ],
            // 图片(image)+视频(video)+标题(title)
            list4: [{
                url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
                title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png', //视频封面
                type: 'video' //视频类型
            },{
                url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                title: '身无彩凤双飞翼，心有灵犀一点通',
                type: 'image' //图片类型
            },{
                url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
            }],
        }
    },
    computed: {
        // 在原有mode上增加了custom模式，如果使用时配置的custom就会使用自定义指示器
        indicatorSolt() {
            return this.indicatorMode == 'custom'? 'indicator' : ''
        },

        // 同时显示的滑块数量，nvue、支付宝小程序不支持
        displayMultipleItems() {
            if (this.list.length >= 1) {
                return 1
            } 
            return 0
        }
    },
    methods: {
        change(e) {
            this.currentNum = e.current
            this.$emit('change', e)
        },
        click(index) {
            this.$emit('click', index)
        }
    }
}
</script>

<style scoped lang="scss">
// .indicator-num {
//     padding: 2px 0;
//     background-color: rgba(0, 0, 0, 0.35);
//     border-radius: 100px;
//     width: 35px;
//     @include flex;
//     justify-content: center;

//     &__text {
//         color: #FFFFFF;
//         font-size: 12px;
//     }
// }

// 自定义指示器样式
.indicator-num {
    background-color: rgba(0, 0, 0, 0.4);
    width: 108rpx;
    height: 54rpx;
    border-radius: 54rpx;
    @include flex;
    justify-content: center;
    align-items: center;

    &__text {
        color: #FFFFFF;
        font-size: 28rpx;
    }
}

// 覆写指示器位置
// ::v-deep .u-swiper__indicator {
//     right: 0rpx !important;
//     bottom: 0rpx !important;
// }

// ::v-deep .u-swiper__indicator {
//     right: var(--indicator-right) !important;
//     bottom:  var(--indicator-bottom) !important;
// }

</style>