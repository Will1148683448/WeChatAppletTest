/**
 * 路由拦截器
 * 文档：https://uniapp.dcloud.net.cn/api/interceptor.html
 */

import {
	PagePath,
	RouteWhiteList
} from '@/router/index.js'

const install = (Vue, vm) => {
	console.log('install router_auth_interceptor')
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(args) {
				console.log('~~route_interceptor invoke:', args)
				//解析路由路径和参数
				let { path, paramsStr, paramsJsonObj } = parseParams(args)
				
				//判断路由页面是否需要登录权限
				// if (!canRouter(path, vm)) {
				// 	return false
				// }
				
				console.log('~~~~passs')
				return args
			},
			success(args) {
				// 请求成功后，修改code值为1
				// args.data.code = 1
				// console.log('~~route_interceptor-success:', args)
			},
			fail(err) {
				// console.log('~~route_interceptor-fail:', err)
			},
			complete(res) {
				// console.log('~~route_interceptor-complete:', res)
			}
		})
	})
}

//解析参数
function parseParams(args) {
	let path = args.url
	let paramsStr = '' //参数
	let paramsJsonObj = {}
	if (path.includes('?')) {
		let splitArr = path.split('?')
		path = splitArr[0]
		paramsStr = splitArr[1]

		if (paramsStr.length > 0) {
			let pArr = paramsStr.split('&')
			pArr.forEach(item => {
				if (item.length > 0) {
					let keyValueArr = item.split('=')
					if (keyValueArr.length == 2) {
						let key = keyValueArr[0]
						let value = keyValueArr[1]
						paramsJsonObj[key] = value
					}
				}
			})
		}
	}

	return {
		path,		//去掉参数的路由路径
		paramsStr, //请求参数字符串格式 'a=1&b=2'
		paramsJsonObj, //请求参数Json格式 {a:1, b:2}
	}
}

//判断路由页面是否需要登录权限
function canRouter(path, vm) {
	if (path === PagePath.Login || path === '/' || new RegExp("^/").test(path) == false) {
		// console.log('~~~~passs')
		return true
	}

	// let isLogin = vm.$store.state.user.isLogin
	let isLogin = getApp().globalData.token != null
	if (!isLogin) {
		console.log('~~未登录', url)
		//是否白名单页面（不用登录）
        let isWhitePage = false
        for (const rule in RouteWhiteList) {
            if (new RegExp(rule).test(path)) {
                isWhitePage = true
                break
            }
        }
		// let isWhitePage = RouteWhiteList.includes(path)
		if (!isWhitePage) { //非白名单页面未登录状态下需要跳转到登录页面
			console.log('非白名单')
			uni.navigateTo({
				url: PagePath.Login
			})
			return false
		}
	}

	return true
}

export default {
	install
}
