<!-- 视频播放组件 -->
<!-- 用例 -->
<!-- <kr-video :item="video"></kr-video> -->
<template>
	<view>
		<view v-if="item.poster && !playing" class="item-cover"
			:style="{ 'height': videoHeight, 'width': videoWidth, 'border-radius': videoRadius }" @click.stop>
			<!-- 封面 -->
			<image class="item-cover-poster" :src="`${item.poster}?imageMogr2/thumbnail/!343x193r`" mode="aspectFill">
			</image>
			<!-- 蒙层 -->
			<view class="item-cover-mask">
				<!-- 播放按钮 -->
				<image class="item-cover-img" :src="IMG_URL + 'common/play.png'" @click.stop="clickPlayBtn">
				</image>
			</view>
		</view>
		<!-- 视频组件 文档：https://uniapp.dcloud.net.cn/component/video.html -->
		<video v-else class="item-video"
			:style="{ 'height': videoHeight, 'width': videoWidth, 'border-radius': videoRadius }" :id="elementID"
			:autoplay="autoplay" :src="item.src"
			:poster="item.poster ? `${item.poster}?imageMogr2/thumbnail/!343x193r` : ''" :initial-time="0.01"
			object-fit="contain" play-btn-position="center" @click.stop @play="onPlay" @ended="onEnded"></video>
	</view>
</template>

<script>
import { clearKRVideo, playKRVideo } from './kr-video.js'
export default {
	props: {
		//组件高度(rpx 默认16:9)
		height: {
			type: Number,
			default: 422
		},
		//组件宽度(rpx)
		width: {
			type: Number,
			default: 750
		},
		// 播放对象
		item: {
			type: Object,
			default: () => {
				return {
					poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png', //封面
					src: 'https://cdn.uviewui.com/uview/resources/video.mp4', //视频地址
					vid: 1, //id
					num: 1, //刷新视频使用的计数器，watch会监听item对象变化，如果想刷新视频，请让此数值+=1
				}
			}
		},
		// 组件圆角，数值或带单位的字符串
		radius: {
			type: Number,
			default: 4 //默认4
		},
		// 是否自动播放
		autoplay: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			playing: false, //是否正在播放
		}
	},
	computed: {
		videoHeight() {
			return this.height + 'rpx'
		},
		videoWidth() {
			return this.width + 'rpx'
		},
		videoRadius() {
			return this.radius + 'rpx'
		},
		elementID() {
			return `video-${this.item.vid}`
		}
	},
	watch: {
		item: {
			handler(ndata, odata) {
				// console.log('~~~~~watch', ndata)
				if (ndata != odata) {
					// console.log('~~~~~watch1', ndata)
					clearKRVideo()
					this.playing = false;
				}
			},
			immediate: true
		}
	},
	created() {
		// console.log('~~~~created')
	},
	beforeDestroy() {
		// console.log('~~~~beforeDestroy')
		clearKRVideo()
		this.playing = false;
	},
	methods: {
		//点击播放按钮
		clickPlayBtn() {
			console.log('~~~~~clickPlayBtn', this.item)
			this.playing = true;

		},

		onPlay(e) {
			console.log('onPlay', e);
			playKRVideo(this.elementID, this)

			this.$emit('play', this.item)
		},
		onEnded(e) {
			console.log('onEnded', e);
			this.playing = false;
			clearKRVideo()

			this.$emit('ended', this.item)
		},
	}
}
</script>

<style scoped lang="scss">
.item-video,
.item-cover {
	position: relative;
	// width: 100%;
	// height: 440rpx;
	// border-radius: 16rpx;
	overflow: hidden;
}

.item-cover-poster {
	width: 100%;
	height: 100%;
}

.item-cover-mask {
	z-index: 1;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: transparent;

	display: flex;
	justify-content: center;
	align-items: center;
}

.item-cover-img {
	width: 108rpx;
	height: 108rpx;
}
</style>