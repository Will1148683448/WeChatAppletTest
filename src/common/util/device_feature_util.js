//拨打电话
export function callPhone(tel) {
    const res = uni.getSystemInfoSync();
    console.log('传入的电话', tel, res.platform);
    // ios系统默认有个模态框
    if (res.platform == 'ios') {
        uni.makePhoneCall({
            phoneNumber: tel,
            success() {
                console.log('拨打成功了');
            },
            fail() {
                console.log('拨打失败了');
            }
        })
    } else if(res.platform == 'android' || res.platform == 'devtools') {

        //安卓手机手动设置一个showActionSheet
        uni.showActionSheet({
            title: tel,
            itemList: ['呼叫'],
            success(res) {
                console.log(res);
                uni.makePhoneCall({
                    phoneNumber: tel,
                })
            }
        })
    }
}