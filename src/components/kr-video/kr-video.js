
// 单播放视频控制

let _videoId = null //当前视频组件id
let _videoContext = null //当前视频组件实例
let _observer = null //监听页面滚动

export function clearKRVideo() {
    console.log('~~~~distroy video')
    _videoId = null;
    _videoContext?.pause();
    _videoContext = null;
    _observer?.disconnect();
    _observer = null;
}
export function playKRVideo(videoId, context) {
    if (_videoId != videoId) {
        clearKRVideo()

        _videoId = videoId;
        _videoContext = uni.createVideoContext(videoId, context);

        _observer = uni.createIntersectionObserver(context);
        _observer.relativeToViewport();

        _observer.observe(`#${videoId}`, res => {
            if (res.intersectionRatio > 0) {
                // 划出屏幕后暂停，再进入屏幕后恢复播放
                // if (this.observerPause) {
                // 	_videoContext.play();
                // }
            } else {
                // 划出屏幕后暂停
                _videoContext.pause();
            }
        });
    }

}
