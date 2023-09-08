<template>
  <div class="m-video" @click="showSkipBtn">
    <div v-show="showSkip" class="btn-skip">跳过</div>
    <video ref="videoDom" class="video" />
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs } from 'vue'
import { commonHub } from '@/utils/commonHub.js'
import { MMD } from '../../../public/ossweb-img/lib/mmd.videoplayer.min.1.0.1'
export default {
  setup() {
    const videoDom = ref(null)

    const data = reactive({
      videoPlayer: null,
      showSkip: false
    })

    commonHub.on('pageChange', (pageName) => {
      console.log(pageName)
      if (pageName === 'video') {
        console.log('跳转接收 开始播放');
        data.videoPlayer.play()
        videoDom.value.play()
        console.log(data.videoPlayer)
      }
    })

    const showSkipBtn = () => {
      data.showSkip = false
    }

    // 初始化视频
    const initVideo = () => {
      const video = videoDom.value
      let isVideoStart = false

      video.setAttribute('x5-video-player-type', 'h5-page')

      const timeListener = () => {
        if (video.currentTime <= 0) return

        if (!isVideoStart) {
          commonHub.commit('videoStart')
          isVideoStart = true

          setTimeout(() => {
            data.showSkip = true
          }, 1000)
        }
      }

      video.addEventListener('timeupdate', timeListener)

      data.videoPlayer = new MMD.VideoPlayer({
        videoElement: video,
        src: require('../../assets/media/video_1.mp4'),
        loop: false,
        muted: false,
        poster: '',
        tryMultipleVideoPlayAtTheSameTime: false,
        timesParam: data.times,
        onTimes: (name) => {
        },
        onEnd: () => {
          commonHub.commit('pageChange', 'share')
        }
      })
    }

    onMounted(() => {
      initVideo()
    })
    const refs = toRefs(data)
    return {
      ...refs,
      videoDom,
      showSkipBtn
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-to,.fade-leave{
    opacity: 1;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 1s;
  }
</style>
