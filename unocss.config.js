import presetWeapp from 'unocss-preset-weapp'
import { defineConfig } from 'unocss'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { transformerAttributify, presetWeappAttributify } = extractorAttributify()

export default defineConfig({
  // 自定义规则
  rules: [
    [/^w-([\.\d]+)$/, ([_, num]) => ({ 'width': `${num}rpx` })],
    [/^h-([\.\d]+)$/, ([_, num]) => ({ 'height': `${num}rpx` })],

    [/^m-([\.\d]+)$/, ([_, num]) => ({ 'margin': `${num}rpx` })],
    [/^m-t-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}rpx` })],
    [/^m-b-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}rpx` })],
    [/^m-l-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}rpx` })],
    [/^m-r-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}rpx` })],
   
    [/^p-([\.\d]+)$/, ([_, num]) => ({ 'padding': `${num}rpx` })],
    [/^p-h-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}rpx`, 'padding-right': `${num}rpx` })],
    [/^p-v-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}rpx`, 'padding-bottom': `${num}rpx` })],
    [/^p-t-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}rpx` })],
    [/^p-b-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}rpx` })],
    [/^p-l-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}rpx` })],
    [/^p-r-([\.\d]+)$/, ([_, num]) => ({ 'padding-right': `${num}rpx` })],

    [/^t-([\.\d]+)$/, ([_, num]) => ({ 'top': `${num}rpx` })],
    [/^b-([\.\d]+)$/, ([_, num]) => ({ 'bottom': `${num}rpx` })],
    [/^l-([\.\d]+)$/, ([_, num]) => ({ 'left': `${num}rpx` })],
    [/^r-([\.\d]+)$/, ([_, num]) => ({ 'right': `${num}rpx` })],

    // 字号
    [/^f-([\.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}rpx` })],

    // 切圆角
    [/^radius-([\.\d]+)$/, ([_, num]) => ({ 'border-radius': `${num}rpx !important`, overflow: 'hidden' })],
    [/^radius-t-([\.\d]+)$/, ([_, num]) => ({ 'border-radius': `${num}rpx ${num}rpx 0 0 !important`, overflow: 'hidden' })],

    // 强制文本行数，末尾加省略号
    [/^text-cut-(\d+)$/, ([_, num]) => ({ 'display': '-webkit-box', '-webkit-box-orient': 'vertical', '-webkit-line-clamp': `${num}`, 'overflow': 'hidden', 'word-break': 'break-all' })],
  ],
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      // h5兼容
      // 只开发小程序可删除
      platform: 'uniapp',
      isH5: process.env.UNI_PLATFORM === 'h5',
      whRpx: true,
    }),

    // attributify autocomplete
    presetWeappAttributify(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'center': 'flex justify-center items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
})