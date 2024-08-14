<!-- 上传组件base-upload二次封装 -->
<template>
	<base-upload ref="u-upload" :fileList="fileList" :accept="accept" :capture="capture" :previewFullImage="previewFullImage" :imageMode="imageMode"
		:multiple="multiple" :maxCount="maxCount" :disabled="disabled" :width="width" :height="height" :borderRadius="borderRadius" :deleteBtnSrc="deleteBtnSrc" :deleteBtnStyle="deleteBtnStyle" :sizeType="sizeType" :maxSize="maxSize" 
		@afterRead="afterRead" @delete="deleteFile">
		<!-- 自定义上传界面 -->
		<slot>
			<!-- u-icon用法：https://uviewui.com/components/icon.html -->
			<!-- <u-icon label="上传" size="40" name="https://cdn.uviewui.com/uview/example/button.png"></u-icon> -->
			<!-- labelPos：bottom / top / left -->
			<u-icon label="上传" labelPos="bottom" name="photo" color="#999" size="100"></u-icon>
		</slot>
	</base-upload>
</template>

<script>
	import BaseUpload from '../base-upload/base-upload.vue'
	export default {
		components: {
			BaseUpload
		},
		props: {
			// 选中图片的圆角
			borderRadius: {
				type: [String, Number],
				default: '16rpx'
			},
			// 删除按钮图片地址
			deleteBtnSrc: {
				type: String,
				default: ''
			},
			// 删除按钮样式
			deleteBtnStyle: {
				type: Object,
				default: () => {
					return {
						height: '40rpx',
						width: '40rpx',
						top: 0,
						right: 0
					}
				}
			},
			// 接受的文件类型, 可选值为all media image file video
			accept: {
				type: String,
				default: 'image'
			},
			// 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
			capture: {
				type: [String, Array],
				default: () => ['album', 'camera'] //['album', 'camera']
			},
			// 是否显示组件自带的图片预览功能
			previewFullImage: {
				type: Boolean,
				default: true
			},
			// 预览上传的图片时的裁剪模式，和image组件mode属性一致https://uniapp.dcloud.net.cn/component/image.html#image
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			// 最大上传数量
			maxCount: {
				type: [String, Number],
				default: 9
			},
			// 是否启用
			disabled: {
				type: Boolean,
				default: false
			},
			// 所选的图片的尺寸, 可选值为original compressed
			sizeType: {
				type: Array,
				default: () => ['original', 'compressed']
			},
			// 是否开启图片多选，部分安卓机型不支持
			multiple: {
				type: Boolean,
				default: true
			},
			// 是否展示删除按钮
			deletable: {
				type: Boolean,
				default: true
			},
			// 文件大小限制，单位为byte
			maxSize: {
				type: [String, Number],
				default: Number.MAX_VALUE
			},
			// 内部预览图片区域和选择图片按钮的区域宽度
			width: {
				type: [String, Number],
				default: '200rpx'
			},
			// 内部预览图片区域和选择图片按钮的区域高度
			height: {
				type: [String, Number],
				default: '100rpx'
			},
		},
		data() {
			return {
				// 当前已添加的图片文件对象列表
				fileList: [
					// {
					// 	size: 149007,
					// 	thumb: "http://tmp/nS8t7n1QZWgV08ebc691de29a2d984b3a73a245d6f18.png",
					// 	type: "image",
					// 	url: "http://tmp/nS8t7n1QZWgV08ebc691de29a2d984b3a73a245d6f18.png"
					// }
				],
				// 当前已添加的图片地址列表
				imageUrls: [
					// "",
				],
			}
		},
		computed: {
			
		},
		methods: {
			afterRead(e) {
				console.log('~~~~~~~~afterRead~', e)
				/*
					e的数据结构
					{
						file: {
							size: 149007
							thumb: "http://tmp/nS8t7n1QZWgV08ebc691de29a2d984b3a73a245d6f18.png"
							type: "image"
							url: "http://tmp/nS8t7n1QZWgV08ebc691de29a2d984b3a73a245d6f18.png"
						},
						name: "",
						index: 0, //图片索引
					}
				*/
				this.fileList = this.fileList.concat(e.file)
				this.imageUrls = this.imageUrls.concat(e.file.url)
				this.$emit('afterRead', [...this.imageUrls])
			},
			deleteFile(e) {
				console.log('~~~~~~~~deleteFile~', e)
				let index = e.index;
                this.fileList.splice(index, 1)
				this.imageUrls.splice(index, 1)
				this.$emit('delete', [...this.imageUrls])
			},
			// onUploadClick() {
			// 	console.log('~~~~~~~~onUploadClick~')

			// 	uni.showActionSheet({
			// 		title: '请选择上传文件类型',
			// 		itemList: ['拍摄', '图片', '视频'],
			// 		success: (res) => {
			// 			console.log('~~~success', res)
			// 			let tapIndex = res.tapIndex

			// 			//界面更新后，再进入文件选择
			// 			this.$nextTick(() => {
			// 				this.$refs['u-upload'].chooseFile();
			// 			});
			// 		},
			// 		fail: (res) => {
			// 			console.log('~~~fail', res)
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
$u-upload-deletable-top: 50rpx !default;
$u-upload-deletable-right: 60rpx !default;
</style>

<style scoped lang="scss">
	
</style>