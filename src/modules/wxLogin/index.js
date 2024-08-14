import { wxCodeLoginApi, wxPhoneLoginApi, getUserInfo } from "@/api/login.js";

// import { selectMyself } from '@/api/my.js';
import store from "@/store/index.js";
import { navigateToLoginView, switchTabToHomeView } from "@/router";

/** 
//微信code登录
async function wxCodelogin() {
  console.log("微信code登录开始");
  // 1.先从微信获取到code
  let res = await uni.login({ provider: "weixin" }).catch((err) => {
    console.log(err);
  });

  if (res?.code) {
    // 2.再调用登录接口，用code换取到token
    let ret = await wxCodeLoginApi({ code: res.code }).catch((err) => {
      console.log(err);
    });

    console.log("~~~~~~~~ret", ret);

    if (ret?.status == 1) {
      console.log("微信code登录成功");
      // 3.拿到token后，放到globalData和本地存储
      getApp().globalData.token = ret.data.token;
      uni.setStorageSync("token", ret.data.token);
      // 4.获取用户信息
      getUser();

      return ret.data.token;
    }
  }

  return null;
}
*/

// 获取微信登录code
async function getWxLoginCode() {
  let res = await uni.login({ provider: "weixin" }).catch((err) => {
    console.log(err);
  });

  return res?.code || ''
}

//微信绑定手机号登录
async function wxPhoneLogin(e) {
  let detail = e.detail;
  // console.log('~~~~', e)
  if (detail.errMsg == "getPhoneNumber:ok") {
    console.log("用户同意授权");
    let code = detail.code;

    let openIdCode = await getWxLoginCode()

    let params = {
      code,
      openIdCode,
    }
    // 如果有邀请码就传递邀请码
    if (getApp().globalData.invite_code.length > 0) {
      params.invitationCode = getApp().globalData.invite_code
    }
    let res = await wxPhoneLoginApi(params);
    console.log(res, "resss");
    if (res.status != 1) {
      uni.$u.toast(res.msg);
      return;
    }

    // 拿到token后，放到globalData和本地存储
    getApp().globalData.token = res.data.token;
    uni.setStorageSync("token", res.data.token);

    // 获取用户信息
    getUser();
    console.log("登录成功");

    uni.$u.toast(res.msg);

    // 跳转首页
    switchTabToHomeView();
  }
}

//获取用户信息，传true则强制调取接口
async function getUser(isForce = false) {
  let { state } = store;

  if (isForce || state.nickName == '') {
    let res = await getUserInfo();
    if (res.status == 1) {
      store.commit("setUserInfo", res.data);
    }
  }
}

// 退出登录
async function logout() {
  getApp().globalData.token = "";
  uni.setStorageSync("token", "");
}

export { wxPhoneLogin, getUser, logout };
