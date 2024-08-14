<!-- 邀请分享 -->
<template>
	<view>
		<kr-navbar :fixed="true" title=" " leftIconColor="#fff" :bgColor="'transparent'"></kr-navbar>
		
		<view style="margin-top: 300rpx; margin-bottom: 20rpx; margin-left: 32rpx;">邀请码：{{ myInvitationCode }}</view>
		<!-- 分享按钮 -->
		<kr-share-button v-show="showShareBtn" class="m-t-48" buttonClass="primary-button radius-16" :shareInfo="shareInfo">立即邀请好友</kr-share-button>

	</view>
</template>

<script>
import {
	mapState,
} from 'vuex';
import { getInviteStatisticsInfo } from '@/api/user.js'
import { getUser } from '@/modules/wxLogin/index.js'
import wxShare_mixins from '@/common/mixins/wxShare_mixins.js'
import Config from '@/config'
export default {
	mixins: [wxShare_mixins],
	data() {
		return {
			// 是否显示分享按钮
			showShareBtn: false,
		}
	},
	computed: {
		...mapState({
			myInvitationCode: state => state.myInvitationCode, //我的分享码
		}),

		//分享链接
		shareInfo() {
			return {
				path: `${Config.wxShareObj.path}?invite_code=${this.myInvitationCode || ''}`
			}
		}
	},
	onLoad(options) {
		this.loadData()
	},
	methods: {
		async loadData() {

			if (this.myInvitationCode == "") {
				uni.showLoading({
					title: '',
					mask: true
				})
				await getUser(true)
				uni.hideLoading()
			}

			this.showShareBtn = this.myInvitationCode != ''
		}
	}
}
</script>

<style>
page {
	background: grey;
}
</style>
<style scoped lang="scss">
.m-t-48 {
	margin-top: 48rpx;
}

</style>