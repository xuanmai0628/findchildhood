
<style lang="less" scoped>
@import './index.less';
</style>

<template>
<div class="cpt-p-login">
    <div class="popup-mask img_default_bg abcter" />
    <transition name="fade">
      <div v-show="popupState === 'channel'" class="abcter channel-box">
        <div class="choose-channel-bg img_bg_choose_channel">
          <div class="wx" />
          <div class="qq" />
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-show="popupState === 'select'" class="abcter login-select-box">
        <div class="login-select-bg img_login_select_bg">
          <select id="channelContentId" class="select-system"> <!-- select标签不能替换为其它标签 -->
            <option value="">请选择系统</option>
          </select>
          <select id="areaContentId" class="select-area"> <!-- select标签不能替换为其它标签 -->
            <option value="">请选择大区</option>
          </select>
          <select id="userContentId" class="select-user"> <!-- select标签不能替换为其它标签 -->
            <option value="">请选择角色</option>
          </select>
          <div class="btn-close-select" />
          <a id="roleCommitButtonId" class="btn-login abcter img_btn_confirm_select" />
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commonHub } from '../../utils/commonHub.js'
import { skipLoading} from '../../config/debug'

let popupState = ref<string>('channel')
    let debuf = ref<string>('')

        const showLogin = () => {
      popupState.value = 'channel'
      commonHub.commit('popupChange', 'login')
    }

    const loginNext = () => {
      if (popupState.value === 'channel') {
        popupState.value = 'select'
      } else {
        hideLogin()
      }
    }

    const hideLogin = () => {
      popupState.value = ''
      commonHub.commit('popupChange', '')
    }

    // @ts-ignore
    window.showLogin = () => {
      showLogin()
    }

    // @ts-ignore
    window.showBind = () => {
        popupState.value = 'select'
        commonHub.commit('popupChange', 'login')
    }
    // @ts-ignore
    window.loginNext = () => {
      loginNext()
    }
    // @ts-ignore
    window.hideLogin = () => {
      hideLogin()
    }

    if (skipLoading) {
        // @ts-ignore
        window.showLogin()
    }
</script>
