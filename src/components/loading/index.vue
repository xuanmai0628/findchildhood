<template>
  <div class="m-loading">
    <div class="loading-ctn" @click="toVideo">
      <div class="loading-bg" />
      <div v-show="data.progress < 100" class="loading-progress">{{ data.progress }}</div>
      <div v-show="data.progress === 100" class="loading-start">点击进入</div>
    </div>
  </div>
</template>

<script>
import { delayImgList, formatImgList, pixiLoading } from './loadingUtils.js'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { commonHub } from '@/utils/commonHub.js'

export default {
  name: 'Loading',
  setup() {
    const data = reactive({ progress: 0 })
    const store = useStore()

    const loading = async() => {
      // img加载
    //   await imgLoading(formatImgList(), (progress) => {
    //     data.progress = progress
    //   })
    //   console.log('前置加载完成, 延迟加载开始')
    //   imgLoading(delayImgList())

      // pixi加载
      await pixiLoading(formatImgList(), (progress) => {
        data.progress = progress
      }).then((resource) => {
        store.commit('cachedView/CHANGE_TEXTURE_LIST', resource)
        console.log(store.getters.textureList)
      })
      console.log('前置加载完成, 延迟加载开始')
      pixiLoading(delayImgList())
    }
    loading()
    // 进入video
    const toVideo = () => {
      commonHub.commit('pageChange', 'scene')
    }

    return {
      loading,
      toVideo,
      data
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
