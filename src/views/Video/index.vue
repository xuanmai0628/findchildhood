
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div class="m-video">
        <video ref="videoDom" class="video abcter"   webkit-playsinline="" playsinline="true" x5-video-player-type="h5-page" width="100%" height="100%" preload="meta"></video>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, defineProps, onMounted } from 'vue'
import { commonHub } from '../../utils/commonHub.js'
import { useStore } from '../../store';
import Config from '../../config';
import { getAssetsFile } from '../../utils/utils';

const store = useStore();
const props = defineProps({
    source: String,
    img: String,
})

const videoSource = ref(getAssetsFile(''));

const { source } = toRefs(props)

const videoDom = ref(null)
const videoPlayer = ref(null)

commonHub.on('pageChange', (pageName) => {
    if (pageName === 'video') {
        videoDom.value.play()
    }
})

onMounted(() => {
    initVideo()
})

const initVideo = () => {
    const video = videoDom.value
    let isVideoStart = false

    video.setAttribute('x5-video-player-type', 'h5-page')

    const timeListener = () => {
        if (video.currentTime <= 0) return

        if (!isVideoStart) {
            isVideoStart = true
            videoDom.value.muted = false
            
        }
    }
    console.log('videoInit')
    video.addEventListener('timeupdate', timeListener)

    video.addEventListener('ended', () => {
        commonHub.commit('pageChange', 'scene')
        // commonHub.commit('videoPlayEnd')
    })

}

const videoPlay = () => {
    videoDom.value.play()
}

const videoPause = () => {
    videoDom.value.pause()
}


</script>
