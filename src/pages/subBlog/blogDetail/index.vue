<!-- 品牌故事详情 -->
<template>
	<view>
		<kr-navbar :fixed="true" title="品牌故事"></kr-navbar>
		<kr-mescroll :loadOptions="loadOptions" :fixed="true" :top="wxPaddingTop+'px'" :upUse="false" @down="downCallback">
			<template v-if="dataDetail">
				<!-- 视频 -->
				<kr-video v-if="showVideo" class="video-style" :item="video"></kr-video>
				<!-- 富文本 -->
				<kr-rich :richContent="dataDetail.content"></kr-rich>
			</template>
		</kr-mescroll>
	</view>
</template>

<script>
import { getBlogDetail } from '@/api/blog.js'

export default {
	data() {
		return {

			// video: {
			// 	// poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png', //封面
			// 	src: 'https://cdn.uviewui.com/uview/resources/video.mp4', //视频地址
			// 	vid: 1 //id
			// },
			video: {},

			dataDetail: null,

			// 加载状态
			loadOptions: {
				status: '',
				size: 0,
				totalSize: 0,
			}
		}
	},
	computed: {
		// 是否显示视频
		showVideo() {
			return this.video.src && this.video.src.length > 0
		}
	},
	onLoad(options) {
		this.informationId = options.id

		// 刷新视频用计数器
		this.refushVideoNum = 1
	},
	methods: {
		// 下拉刷新
		async downCallback() {
			this.loadOptions = {
				status: 'loading'
			}
			let res = await getBlogDetail(this.informationId)
			if (res.status != 1) {
				uni.$u.toast(res.msg)
				this.loadOptions = {
					status: 'error'
				}
				return
			}
			this.dataDetail = {
				content: res.data.content,
				videoUrl: res.data.videoUrl
			}
			this.refushVideoNum += 1
			this.video = {
				src: this.dataDetail.videoUrl, //视频地址
				vid: this.informationId, //id
				num: this.refushVideoNum
			}
			
			this.loadOptions = {
				status: 'success',
			}
		},

	}
}
</script>

<style lang="scss">
page {
	background: $page-bg-white;
}
</style>
<style scoped></style>