//不需要传token的api
// export const NoNeedTokenUrls = []
//需要登录才能访问的页面
// export const NeedLoginPages = []

//微信分享页
export const WXSharePages = []

// 常量
export const PagePath = {
	Login: '/pages/subLogin/authLogin/index', //登录页
	Home: '/pages/tab/tabHome/index', //首页
}

//路由白名单（不需要登录，支持正则表达式）
export const RouteWhiteList = [
// 	'^/pages/start',
// 	'^/pages/subLogin',
// 	'^/pages/subBlog',
// 	'^/pages/subTeaStore',
// 	'^/tab/tabHome'
]

// 跳转到登录页
export function navigateToLoginView() {
    navigateTo(PagePath.Login)
}

// 切换到首页
export function switchTabToHomeView() {
    uni.switchTab({
        url: PagePath.Home
    })
}

// 自定义路由函数，目标页面是当前页面不跳转，目标页面是上个页面退回去，其余正常跳转
export function navigateTo(url) {
	let pages = getCurrentPages();
	let current = pages[pages.length - 1]['$page']['fullPath'];
	let prev = pages.length > 1 ? pages[pages.length - 2]['$page']['fullPath'] : '';

	if (url == current) {
		return;
	} else if (url == prev) {
		uni.navigateBack();
	} else {
		uni.navigateTo({
			url
		});
	}
}

// 是否是从分享进来的？
export function fromShare() {
	let pages = getCurrentPages();
	let currentPath = pages[pages.length - 1].route; //当前页的路由

	return pages.length == 1 && (!WXSharePages.includes(currentPath));
}
