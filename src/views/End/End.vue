
<style lang="less" scoped>
@import './index.less';
</style>

<template>
      <div class="m-end">
        <div class="end-bg img_end_bg abcter">落版页</div>
    </div>
</template>

<script setup lang="ts">
import { commonHub } from '../../utils/commonHub.js'

commonHub.on('pageChange', (pageName) => {
    if (pageName === 'end') {
        console.log('落版页');
    }
})

</script>
