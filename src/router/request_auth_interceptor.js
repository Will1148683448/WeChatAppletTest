/**
 * 请求拦截器
 * 文档：https://uniapp.dcloud.net.cn/api/interceptor.html
 */

const install = (Vue, vm) => {
	uni.addInterceptor('request', {
		invoke(options) { //options是uni.request的所有参数
			console.log('~~request_interceptor invoke:', options)

			// if (options.url) {
			// 	if (options.url.includes('/api') || options.url.includes('/appconfig') ) {
			// 		options.header = {
			// 			...options.header,
			// 			'Authorization': getApp().globalData.token || '',
			// 		}
			// 		console.warn('~~request_interceptor invoke addToken:', options)
			// 	}

			// }


			return options
		},
		// returnValue(args) {
		// 	const outer = () => {
		// 	  const inner = () => {
		// 		  console.groupCollapsed('%c hello', 'color:#ff00ff')
		// 		  console.trace();
		// 		  console.groupEnd()
		// 	  }
		// 	  inner();
		// 	};
		// 	outer();

		// 	console.log('%c~~~~Interceptor returnValue %O', 'color:#ff00ff', args)
		// 	return args
		// },
		success(response) {

			// cookies: []
			// data: {status: "1", data: {…}, msg: "登录成功"}
			// errMsg: "request:ok"
			// header: {Vary: "Origin,Access-Control-Request-Method,Access-Control-Request-Headers", X-Content-Type-Options: "nosniff", X-XSS-Protection: "1; mode=block", Cache-Control: "no-cache, no-store, max-age=0, must-revalidate", Pragma: "no-cache", …}
			// statusCode: 200
			console.log('~~request_interceptor-success:', response)

			// if (response.data.status == ResponseStatus.Status_10001) {
			// 	console.error('token失效')
			// 	LoginModule.logout()
			// }
		},
		fail(err) {
			console.log('~~request_interceptor-fail:', err)
		},
		complete(res) {
			// cookies: []
			// data: {status: "1", data: {…}, msg: "登录成功"}
			// errMsg: "request:ok"
			// header: {Vary: "Origin,Access-Control-Request-Method,Access-Control-Request-Headers", X-Content-Type-Options: "nosniff", X-XSS-Protection: "1; mode=block", Cache-Control: "no-cache, no-store, max-age=0, must-revalidate", Pragma: "no-cache", …}
			// statusCode: 200
			console.log('~~request_interceptor-complete:', res)
		}
	})

}
export default {
	install
}