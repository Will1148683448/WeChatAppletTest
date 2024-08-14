// 页面路径：store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		wxPaddingTop: 0, // 微信顶部navbar+状态栏高度（单位px）
		// userId: null,
		nickName: '',
		// headImg: '',
		myInvitationCode: '', //我的邀请码

		//定位相关
		location: {
			latitude: null, //纬度
			longitude: null, //经度
			address: '', //详细地址
			province: '', //省
			city: '', //市
			district: '', //区
			street: '', //街道
		},
	},
	mutations: {
		setNavBarPaddingTop(state, data) {
			state.wxPaddingTop = data
		},
		setUserInfo(state, data) {
			// state.userId = data.userId
			state.nickName = data.nickName
			// state.headImg = data.headImg
			state.myInvitationCode = data.invitationCode
		},

		setLocation(state, coordinate) {
			state.location.latitude = coordinate.latitude
			state.location.longitude = coordinate.longitude
		},
	}
})

export default store