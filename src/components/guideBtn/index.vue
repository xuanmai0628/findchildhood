
<style lang="less" scoped>
@import './index.less';
</style>

<template>
      <div v-show="guideBtnVisible" class="btn-guide img_icon_rule" @click="showGuide "></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commonHub } from '../../utils/commonHub.js'
import { getQuery } from '../../utils/utils.js';

const guideBtnVisible = ref<boolean>(false)

commonHub.on('guideBtnVisibleState', (state) => {
    guideBtnVisible.value = state
})

const showGuide = () => {
    commonHub.commit('popupChange', 'guide')
    if (!getQuery('debug')) {
        PTTSendClick && PTTSendClick('btn', 'showGuidePopup', '点击活动规则');
    }
}
</script>
