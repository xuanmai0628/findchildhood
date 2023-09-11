
<style lang="less" scoped>
@import './index.less';
</style>

<template>
       <div class="cpt-reward abcter">
    <div class="reward-popup img_reward_ticket abcter">
      <div class="reward-list">
        <div class="reward-item abcter">
          <div class="reward-icon img_reward_icon_0"></div>
          <div class="reward-name">钻石*20</div>
        </div>

        <div class="reward-item abcter">
          <div class="reward-icon" :class="`img_reward_icon_${rewardIndex}`"></div>
          <div class="reward-name">{{rewardName}}</div>
        </div>
      </div>
      <div class="btn-reward-close abcter img_btn_close" @click="closeReward" ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commonHub } from '../../utils/commonHub.js'
import rewards from '../../config/reward'
import { getQuery } from '../../utils/utils.js'

    const rewardIndex = ref<number>(-1)
    const rewardName = ref<string>('')

    const closeReward = () => {
        commonHub.commit('popupChange', '')
        if (!getQuery('debug')) {
            PTTSendClick && PTTSendClick('btn', 'clickHideRewardPopup', '点击关闭奖励弹窗');
    }
    
    }

    // @ts-ignore
    window.showReward = () => {
        commonHub.commit('popupChange', 'reward')
        if (!getQuery('debug')) {
            PTTSendClick && PTTSendClick('btn', 'clickShowRewardPopup', '点击显示奖励弹窗');
    }
    }

    // @ts-ignore
    window.hideReward = () => {
        commonHub.commit('popupChange', '')
    }

    // @ts-ignore
    window.setReward = (id: string) => {
      if (rewards.hasOwnProperty(id)) {
        console.log(rewards[id].packageName)
        rewardName.value = rewards[id].packageName;
        rewardIndex.value = rewards[id].index;
      }
    }
</script>
