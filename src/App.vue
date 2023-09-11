

<template>
    <div class="m-horizontal">
        <div class="m-wrap">
            <div :class="needScale?'m-inner scale-dom abcter':'absf scale-dom'">
                <transition name="fade"><Loading v-show="pageState === 'loading'" /></transition>

                <transition name="fade"><Videos v-show="pageState === 'video'" /></transition>

                <transition name="fade"><Scene v-show="pageState === 'scene'" /></transition>

                <transition name="fade"><End v-show="pageState === 'end'" ref="endRef" /></transition>

            </div>
        </div>
        <div class="btn-test"></div>
    </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, onMounted } from 'vue'
// import Audios from './utils/Audio'

import Loading from './views/Loading/Loading.vue'
import Videos from './views/Video/index.vue'
import Scene from './views/Scene/index.vue'
import End from './views/End/End.vue'
import useScale from './utils/useScale'
import { commonHub } from "./utils/commonHub";
import { getQuery, orientation } from './utils/utils'
import Vconsole from 'vconsole'
import Config from './config'


const endRef = ref()

const pageState = ref<string>('loading')
const popupState = ref<string>('')

// 缩放兼容ipad
const { needScale, init } = useScale();

commonHub.on('pageChange', (pageName) => {
    pageState.value = pageName
})

commonHub.on('popupChange', (pageName) => {
    popupState.value = pageName
})

onMounted(() => {
    init()

})

// @ts-ignore
window.setUserInfo = (data) => {
    Config.userInfo = data
    commonHub.commit('setUserInfo')
}

if (getQuery('vconsole')) {
    const vConsole = new Vconsole()
    console.log(vConsole)
}

</script>

<style lang="less">
@import './less/reset.less';
@import './less/common.less';
@import './less/keyframe.less';
@import './less/imgs.less'; // node生成的背景图片样式
@import './less/baseImgs.less'; // 固定为base64的图片

html {
    font-size: 16px;
    width: 100%;
    height: 100%;
    width: 100vw;
    height: 100vh;
    background: #000;
}

body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
}

.m-inner {
  
    width: 7.5rem;
    height: 16.24rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 0;
}

#app {

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    width: 100%;
    height: 100%;
}

.m-horizontal {
    -webkit-transform-origin: center center;
    transform-origin: center center;
    // -webkit-transform: rotate(90deg);
    // transform: rotate(90deg);
    .m-wrap {
        // width: 100%;
        // height: 100%;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        // background: orange;
        .scene-state-ani-ctn{
        // position: absolute;
      
        width: 7.5rem;
        height: 16.24rem;
        overflow: hidden;
        pointer-events: none;
        z-index: 5;
        }
    }
}
@media all and (orientation: landscape) {
    // .m-horizontal {
    //     -webkit-transform: rotate(0deg);
    //     transform: rotate(0deg);
    //     .m-wrap {
    //         width: 100vw;
    //         height: 100vh;
    //     }
    // }
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: all .6s;
}

@keyframes openAni {
    0%{
        transform: translate3d(0, 0, 0);
    }
    100%{
        transform: translate3d(0, -90rem, 0);
    }
}
</style>
