// 微信顶部导航栏高度
import {
	mapState,
} from 'vuex';

export default {
    computed: {
        ...mapState({
			wxPaddingTop: state => state.wxPaddingTop, //微信顶部navbar+状态栏高度（单位px）
		}),
    }
}