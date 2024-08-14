import { judgeLocationPerm } from './mp/index.js'

/**
 * 获取位置信息
 * @param {Boolean}  needShow // 是否展示授权弹窗
 * @returns
 *  {
 *    status: 1
 *    data: {
 *      coordinate: {
 *         accuracy: 65
 *         errMsg: "getLocation:ok"
 *         horizontalAccuracy: 65
 *         latitude: 36.07515
 *         longitude: 120.41283
 *         speed: -1
 *         verticalAccuracy: 65
 *      }
 *    }
 *    msg: ''
 *  }
 **/
export async function getLocation(needShow) {
  let res = {status:0, data:null, msg: ''}
  // #ifdef MP-WEIXIN
  res = await judgeLocationPerm(needShow)
  // #endif
  return res;
}

// 打开内置地图
export function openLocation(data) {
  uni.openLocation({
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
    name: data.name,
    address: data.address,
    success: () => {
      console.log('success');
    },
    fail: (e) => {
      console.log('fail', e);
    }
  });
}