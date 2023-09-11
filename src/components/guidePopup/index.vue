
<style lang="less" scoped>
@import './index.less';
</style>

<template>
       <div class="cpt-guide abcter">
    <div class="guide-popup abcter img_rule_bg">
      <div class="btn-guide-close img_btn_close abcter" @click="closeGuide" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commonHub } from '../../utils/commonHub.js'
import { getQuery } from '../../utils/utils.js';

    const closeGuide = () => {
        commonHub.commit('popupChange', '')
        if (!getQuery('debug')) {
            PTTSendClick && PTTSendClick('btn', 'clickGuidePopup', '点击关闭规则弹窗');
    }
    }
</script>
