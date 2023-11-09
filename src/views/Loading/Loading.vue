
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div class="m-loading" >
        <div class="loading-ctn">
            <div class="loading-bg"></div>
            <div class="loading-text">{{ counter }}%</div>
            <div class="loading-bar">
                <div :style="{ 'width': counter + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { delayImgList, formatImgList, pixiLoading } from './loadingUtils.js'
import { commonHub } from '../../utils/commonHub.js'
import { useStore } from '../../store';
import { getQuery } from '../../utils/utils'
const store = useStore();

// 显示进度
let counter = ref<number>(0);

const loading = async() => {
    // pixi加载
    await pixiLoading(formatImgList(), (progress) => {
        // console.log('加载进度',progress);
        counter.value = parseInt(progress);
        if (counter.value >= 99) {
            commonHub.commit('pageChange', 'scene')
        }
    }).then((resource) => {
        store.setImgsBuffer(resource);
        counter.value = 100;
    })


    console.log('前置加载完成, 延迟加载开始')
    pixiLoading(delayImgList()).then((resource) => { 
        store.setShareImgBuffer(resource)
        debugEvent()
    })
}
loading()

const debugEvent = () => {
    if (getQuery('debug')) {
        commonHub.commit('setUserInfo')
    }

    if (getQuery('toScene')) {
        commonHub.commit('pageChange', 'scene')
    }

    if (getQuery('toEnd')) {
        commonHub.commit('pageChange', 'share')
    }
}

// 进入video
const toVideo = () => {
  

}


// @ts-ignore
window.toHome = () => {
    toVideo()
}

</script>
