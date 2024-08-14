<!-- 自定义上传组件 @afterRead回传文件数组 -->
<!-- 例子： -->
<!-- <upload-photo @afterRead="afterRead"></upload-photo> -->
<template>
    <kr-upload :multiple="false" :maxCount="1" width="240rpx" height="240rpx" borderRadius="16rpx"
        :deleteBtnSrc="IMG_URL + 'common/upload_delbtn.png'" :deleteBtnStyle="{
            height: '40rpx',
            width: '40rpx',
            top: '-8rpx',
            right: '-8rpx',
        }" @afterRead="afterRead" @delete="deleteFile">
        <!-- 自定义添加图片按钮 -->
        <view class="no-photo flex flex-col flex-items-center" solt="defalut">
            <kr-image class="m-t-48" :src="IMG_URL + 'common/ic_photo.png'" width="80rpx" height="80rpx"
                :fade="false"></kr-image>
            <text class="tip m-t-16">请上传单张图片凭证</text>
        </view>
    </kr-upload>
</template>
<script>
import krUpload from '@/modules/uploadCloudOS/components/kr-upload/kr-upload.vue'
export default {
    components: {
        krUpload
    },
    data() {
        return {

        }
    },
    methods: {
        /****************** 回调接口 ******************************/
        //选择文件成功
        afterRead(imageUrls) {
            this.$emit('afterRead', imageUrls)
        },
        //删除文件
        deleteFile(imageUrls) {
            this.$emit('afterRead', imageUrls)
        },
    }
}
</script>

<style lang="scss" scoped>
.no-photo {
    width: 622rpx;
    height: 240rpx;
    background: #F5F5F5;
    border-radius: 16rpx;
}

.m-t-48 {
    margin-top: 48rpx;
}

.tip {
    font-weight: 400;
    font-size: 28rpx;
    color: #CCCCCC;
}

.delete_icon {
    position: absolute;
    // transform: scale(0.7);
    top: -8rpx;
    right: -8rpx;
}
</style>