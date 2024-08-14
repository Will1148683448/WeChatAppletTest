import Vue from 'vue'
import App from './App'
//uni-app生产环境去掉console
// if (process.env.NODE_ENV === 'production') {
// 	console.log = () => {};
// 	console.info = () => {};
// 	console.warn = () => {};
// 	console.error = () => {};
// }
import './uni.promisify.adaptor'
import store from './store'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

// 全局混入静态资源路径
import staticUrl_mixins from './common/mixins/staticUrl_mixins.js';
Vue.mixin(staticUrl_mixins)
// 微信胶囊高度
import wxNav_mixins from '@/common/mixins/wxNav_mixins.js'
Vue.mixin(wxNav_mixins)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

// 路由权限拦截
// import request_auth_interceptor from '@/router/request_auth_interceptor.js'
// Vue.use(request_auth_interceptor, app)
// import router_auth_interceptor from '@/router/router_auth_interceptor.js'
// Vue.use(router_auth_interceptor, app)

app.$mount()

console.log('当前环境', process.env.NODE_ENV)
