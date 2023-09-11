
<style lang="less" scoped>
@import './index.less';
</style>

<template>
      <div v-show="audioShowHide" class="btn-audio" :class="audioState ? 'img_audio_play' : 'img_audio_stop'" @click="(e) => {e.stopPropagation(); audioStateChange()} "></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Audios from '../../utils/Audio'
import { commonHub } from '../../utils/commonHub.js'
import { getQuery } from '../../utils/utils.js';

const audioShowHide = ref<boolean>(false)
const audioState = ref<boolean>(true)

commonHub.on('audioBtnVisibleState', (state) => {
    audioShowHide.value = state
})

const audioStateChange = () => {
    Audios.changeMute()
    audioState.value = !audioState.value
    if (!getQuery('debug')) {
        PTTSendClick('btn','audioChange','点击音乐开关');
    }
}
</script>
