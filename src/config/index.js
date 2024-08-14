const CONFIG = {
    // 开发环境配置
    development: {
      ApiUrl: 'https://tearoom-stg.pm.yixueyice.com', // 开发环境
      // ApiUrl: 'http://10.0.0.176:42401',

      // 在 common/mixins/staticUrl_mixins.js 中切换使用cos目录还是本地/static目录
      StaticWebUrl: 'https://tearoom-1325751999.cos.ap-beijing.myqcloud.com/prd/tearoom/statics', //静态资源地址
      StaticLocalUrl: '/static', //本地静态资源地址

      // 微信分享配置
      wxShareObj: {
        title: 'Will测试',
        path: '/pages/tab/tabUserCenter/index', //分享页面（这个页面能拉起登录界面，方便用户绑定分享人邀请码）
        imageUrl: '', //分享图片(空串或不填写会使用分享按钮所在的页面截图)
      },
    },
    // 生产环境配置
    production: {
      // ApiUrl: 'https://tearoom-stg.pm.yixueyice.com', // 开发环境
      ApiUrl: 'https://tearoom.pm.yixueyice.com', // 生产环境
      StaticWebUrl: 'https://tearoom-1325751999.cos.ap-beijing.myqcloud.com/prd/tearoom/statics', //静态资源地址
      StaticLocalUrl: '/static', //本地静态资源地址

      // 微信分享配置
      wxShareObj: {
        title: 'Will测试',
        path: '/pages/tab/tabUserCenter/index', //分享页面（这个页面能拉起登录界面，方便用户绑定分享人邀请码）
        imageUrl: '', //分享图片(空串或不填写会使用分享按钮所在的页面截图)
      },
    },
}

export default CONFIG[process.env.NODE_ENV];
