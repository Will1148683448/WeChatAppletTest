<!-- 富文本展示 -->
<!-- 用例 -->
<!-- <kr-rich :richContent="dataDetail.content" padding="32rpx"></kr-rich> -->
<template>
    <view :style="{padding:padding}">
        <!-- 注意：v-html展示quill富文本需要添加ql-editor样式；并且h5端需要安装quill库，并引入quill/dist/quill.core.css；微信小程序端不需要安装quill，估计微信框架中已安装quill，并且不可引入quill/dist/quill.core.css -->
        <!-- <view class="ql-editor w-100%" v-html="content"></view> -->

        <!-- 不需要ql-editor样式，支持数学公式 -->
        <mp-html :content="content" />
    </view>
</template>

<script>
import MpHtml from './mp-html/mp-html.vue'
// #ifdef H5
// import 'quill/dist/quill.core.css'
// #endif 
export default {
    components: {
        MpHtml
    },
    // options: {
    // 	styleIsolation: 'shared'
    // },
    props: {
        //富文本内容
        richContent: {
            type: String,
            // default: "$c = \\pm\\sqrt{a^1 + b^2}$"
            default: ""
        }, 
        padding: {
            type: String,
            default: '32rpx 32rpx 100rpx 32rpx'
        }
    },
    computed: {
        content() {
            if (!this.richContent) {
                return ''
            }
            // console.log('this.richContent', this.richContent)
            // 图片拉伸宽度
            let res = this.richContent.replace(/<img/gi, '<img class="rich-image-wrap"')
            // res = '$\\sqrt{a^1 + b^2}$' + res
            let output = res
            // 获取所有公式（不做替换）
            let latexArr = []
            let tempOutput = res
            const startElement = '<annotation encoding="application/x-tex">'
            const endElement = '</annotation>'
            while (true) {
                // console.log('~~~~before', tempOutput)

                let latexStartIndex = tempOutput.indexOf(startElement)
                let latexEndIndex = tempOutput.indexOf(endElement)
                let latexStr = ''
                // console.log('~~~~latexEndIndex', latexStartIndex, latexEndIndex)
                if (latexStartIndex >= 0 && latexEndIndex >= 0) {
                    latexStr = tempOutput.substring(latexStartIndex + startElement.length, latexEndIndex)
                    // console.log('~~~~latexStr', latexStr)
                    latexArr.push(latexStr)

                    tempOutput = tempOutput.substring(latexEndIndex + endElement.length)
                } else {
                    break
                }

                // break
            }
            // console.log('~~~~latexArr', latexArr)
            // return ''

            // 替换文本
            while (true) {
                if (latexArr.length == 0) {
                    break
                }
                // console.log('~~~~before', output)

                let beginIndex = output.indexOf('<span class="ql-formula"')
                let startIndex = output.indexOf('\uFEFF')
                // console.log('~~~~beginIndex', beginIndex, startIndex)
                let begin = ''
                if (beginIndex >= 0 && startIndex >= 0) {
                    begin = output.substring(0, beginIndex)
                    output = output.substring(startIndex+1);
                    // console.log('~~~~=======begin', begin)
                    // console.log('~~~~=======last', output)
                }
                
                let endWord = '\uFEFF'
                let endIndex = output.indexOf(endWord)
                // console.log('~~~~endIndex', beginIndex, startIndex, endIndex)
                if (endIndex >= 0) {
                    let latexStr = latexArr.shift()
                    // console.log('~~~公式：', latexStr)
                    let endStr = output.substring(endIndex+1)
                    // console.log('~~~~endStr', endStr)
                    output = begin + '<span>$' + latexStr + '$' + endStr;
                    // console.log('~~~~after', output)
                }
            }

            console.log('~~~~~output', output)
            return output
        }
    }
}
</script>

<style lang="scss">
// 富文本图片长度不能超过容器最大宽度
::v-deep.rich-image-wrap {
	max-width: 100%;
}
</style>
<style lang="scss" scoped>

</style>