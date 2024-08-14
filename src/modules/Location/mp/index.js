// import { getReverseLocation } from '../amap'

/**
 * 判断位置信息是否授权并做出相应处理
 **/
let isShowOpenSetting = true;
function confirmAuthorization() {
  // console.log('进入了confirmAuthorization函数')
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: "是否去授权位置权限？",
      cancelColor: "#000000",
      confirmColor: "#576B95",
      success: ({ confirm, cancel }) => {
        if (confirm) {
          uni.openSetting({
            success(res) {
              resolve({ status: 1, data: res, msg: "打开小程序设置成功" });
              // console.log('uni.openSetting', res)
            },
            fail(error) {
              resolve({ status: 0, data: null, msg: error });
            },
          });
        } else {
          resolve({ status: 0, data: null, msg: "取消打开设置" });
        }
      },
      fail: (error) => {
        resolve({ status: 0, data: null, msg: error });
      },
    });
  });
}
/**
 * 获取模糊的经纬度信息
 **/
function getLocationInfo() {
  // console.log('进入了getLocationInfo函数')
  return new Promise((resolve) => {
    wx.getLocation({
      type: "wgs84",
      success: async (res) => {
        resolve({
          status: 1,
          data: { coordinate: res },
          msg: "获取坐标以及地理位置信息成功",
        });
      },
      fail: (err) => {
        resolve({ status: 0, data: null, msg: err });
      },
    });
  });
}
/**
 * 判断位置信息是否授权并做出相应处理
 * @param {Boolean}  needShow // 是否展示提示授权弹框
 **/
export function judgeLocationPerm(needShow) {
  return new Promise(async (resolve, reject) => {
    // console.log('进入了judgeLocationPerm函数', needShow)
    // 获取权限设置信息
    let res = await uni.getSetting().catch((err) => {
      return resolve({ status: 0, data: null, msg: err });
    });
    console.log(res, "uni.getSetting返回结果");
    // 如果获取到了设置信息则继续向下执行，并判断是否授权了地理位置信息
    // 如果地理位置信息未授权，则调用授权接口
    if (!res.authSetting["scope.userLocation"]) {
      let authorizeRes = false; // 默认授权选择了拒绝
      await uni
        .authorize({ scope: "scope.userLocation" })
        .then(() => {
          console.log("··················", authorizeRes);
          authorizeRes = true;
        })
        .catch(() => {
          authorizeRes = false;
        });
      // 如果走了拒绝授权的接口，那么要判断是否展示自定义的授权弹窗
      // 如果是用户自己再次点击地理位置信息，那么展示自定义的授权弹窗
      if (!authorizeRes && needShow && isShowOpenSetting) {
        isShowOpenSetting = false;
        let confirmAuthorizationRes = await confirmAuthorization();
        // 如果成功打开了设置页面，并且成功得到了新的设置信息
        if (confirmAuthorizationRes.status == 1) {
          // 如果用户没有设置定位授权开启，直接返回
          if (
            !confirmAuthorizationRes.data?.authSetting["scope.userLocation"]
          ) {
            return resolve({
              status: 0,
              data: null,
              msg: "用户没有打开位置授权",
            });
          }
        } else {
          return resolve({
            status: 0,
            data: null,
            msg: "用户没有打开小程序设置页面",
          });
        }
      }
    }
    let locationInfoRes = await getLocationInfo();
    resolve({
      status: locationInfoRes.status,
      data: locationInfoRes.data,
      msg: locationInfoRes.msg,
    });
  });

  //     // 如果已经授权了位置信息，则直接调用获取经纬度信息
  //     if (res.authSetting['scope.getLocation']) {
  //     // 调用获取经纬度信息
  //     let ret = await getLocationInfo();
  //     // console.log('getLocationInfo', ret)
  //     return ret;
  // }
  // // 如果没有授权，则去授权
  // let authorizeRes = false; // 是否授权条件
  // await uni.authorize({ scope: 'scope.getLocation' }).then(() => {
  //     authorizeRes = true;
  // }).catch(() => {
  //     authorizeRes = false;
  // });
  // // 如果去授权选择了确认则直接调用获取经纬度信息
  // if (authorizeRes) {
  //     let ret = await getLocationInfo();
  //     // console.log('getLocationInfo', ret)
  //     return ret;
  // }
  // // 如果去授权选择了取消，则判断是不是用户主动触发的这个函数，如果是则弹出自定义的确认授权窗口
  // // console.log(initiative)
  // if (needShow) {
  //     let confirmAuthorizationRes = await confirmAuthorization().catch(() => {

  //     });
  //     if (confirmAuthorizationRes?.authSetting['scope.getLocation']) {
  //         let ret = await getLocationInfo();
  //         // console.log('getLocationInfo', ret);
  //         return ret;
  //     }
  // }
}
