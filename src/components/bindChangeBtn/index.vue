
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div v-show="bindBtnVisible" class="btn-change_bind" :class="bindBtnVisible">
        <div class="img_btn_change_login"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commonHub } from '../../utils/commonHub.js'

const bindBtnVisible = ref<boolean>(false)

// @ts-ignore
window.hideBtnBind = () => {
    bindBtnVisible.value = false
}

commonHub.on('bindBtnVisibleState', (state) => {
    bindBtnVisible.value = state
})

</script>
