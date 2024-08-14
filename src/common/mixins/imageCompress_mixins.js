// cos图片裁剪混入
const CompressImgMixin = {
	methods: {
		/**
		 * 图片压缩裁剪
		 * @param {Number} type  0:阿里OSS 1:腾讯COS
		 * @param {String} url 图片地址
		 * @param {Number} w 图片缩放的宽度
		 * @param {Number} h 图片缩放的高度
		 */
		compressImg_mixin(type, url, w=null, h=null) {
			if (url == null) {
				return ''
			}
			if (w == null || h == null) {
				// console.error('~~~~aaaaaaaaa', url, w, h)
				return url
			}
			let tempUrl = url
			
			if (type == 0) {
				let index = url.indexOf('?x-oss-process=')
				if (index != -1) {
					tempUrl = url.substring(0, index)
				}
			} else if (type == 1) {
				let index = url.indexOf('?imageView2')
				if (index != -1) {
					tempUrl = url.substring(0, index)
				}
			}
			let width = uni.$u.getPx(w)*2
			let height = uni.$u.getPx(h)*2
			// console.log('~~~compressImg_mixin:', `(${w},${h})`, `clip=(${width},${height})`)

			let queryParams = ''
			if (type == 0) {
				queryParams = `?x-oss-process=image/resize,m_mfit,w_${width},h_${height}`
			} else if (type == 1) {
				queryParams = `?imageView2/1/w/${width}/h/${height}/q/100`
			}
			let res = tempUrl + queryParams
			// console.log('~~~~~compressImg_mixin', res)
			return res
		},

		//阿里oss图片裁剪
		ossCompressImg_mixin(url, w=null, h=null) {
			return this.compressImg_mixin(0, url, w, h)
		},

		//COS图片裁剪
		cosCompressImg_mixin(url, w=null, h=null) {
			// console.error('~~~~~~cosCompressImg_mixin', url, w, h)
			return this.compressImg_mixin(1, url, w, h)
			
		}
	}
}

export default CompressImgMixin
