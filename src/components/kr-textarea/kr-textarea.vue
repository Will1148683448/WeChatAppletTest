<!-- 设置字体颜色需要使用  styleIsolation: 'shared' 和 ::v-deep 和  !important-->
<!-- 如果设置了scoped， ::v-deep使用时，组件必须外面包裹一层view，否则需要去掉scoped -->
<!-- 用例： -->
<!-- <kr-textarea v-model="fallbackContent" height="600rpx" placeholder="请填写您的评价内容～"></kr-textarea> -->
<template>
    <view>
        <u--textarea :value="value" :placeholder="placeholder" :placeholderClass="placeholderClass" :height="height"
            :count="count" :maxlength="maxlength" :formatter="formatter" :border="border"
            @input="handleInput"></u--textarea>
    </view>
</template>

<script>
let _maxLength = 500
export default {
    options: {
        styleIsolation: 'shared'
    },
    props: {
        // 输入框的内容（双向绑定用value，并且需要@input中this.$emit('input', e) ）
        value: {
            type: [String, Number],
            default: uni.$u.props.textarea.value
        },
        // 输入框为空时占位符
        placeholder: {
            type: [String, Number],
            default: '请输入内容'
        },
        // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
        placeholderClass: {
            type: String,
            default: uni.$u.props.input.placeholderClass
        },
        // 输入框高度
        height: {
            type: [String, Number],
            default: uni.$u.props.textarea.height
        },
        // 是否显示统计字数
        count: {
            type: Boolean,
            default: true
        },
        // 最大输入长度，设置为 -1 的时候不限制最大长度
        maxlength: {
            type: [String, Number],
            default: 500
        },
        // 边框类型，surround-四周边框，none-无边框，bottom-底部边框
        border: {
            type: String,
            default: 'surround'
        },
    },
    data() {
        return {
        }
    },
    watch: {
        maxlength: {
            handler(ndata, odata) {
                _maxLength = ndata
            },
            immediate: true
        }
    },
    methods: {
        handleInput(e) {
            // console.log('~~~~~', e)
            // 双向绑定这句代码是关键
            this.$emit('input', e)
        },

        // 限制不超过长度
        formatter: (value) => {
            // 这里无法使用this，是undefine，所以只能用全局变量了
            // console.log('~~~~~~~formatter', value, _maxLength)
            if (value.length >= _maxLength) {
                return value.substr(0, _maxLength)
            } else {
                return value
            }
        }
    }
}
</script>


<style lang="scss" scoped>
// 覆盖文本域字体颜色
::v-deep .u-textarea__field {
    color: #666666 !important;
    // color: red !important;
}

// 覆盖文本域placeholder字体颜色
::v-deep .textarea-placeholder {
    color: #CCCCCC !important;
}
</style>