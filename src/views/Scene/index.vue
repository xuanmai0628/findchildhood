
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div class="m-scene abcter">
        <canvas class="abcter scene-canvas" id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { commonHub } from '../../utils/commonHub.js'
import * as PIXI from 'pixi.js'
import { onMounted, ref } from 'vue'

const app = ref()
const textureList = PIXI.utils.TextureCache;

//定义是否向上还是向下
let isTextMove = ref(true)

commonHub.on('pageChange', (pageName) => {
    if (pageName === 'scene') {
        initCanvas()
    }
})

onMounted(() => {
    app.value = new PIXI.Application({
        view: document.querySelector('.scene-canvas'),
        width: 750,
        height: 1624,
        backgroundColor: 0xffe0ac,
        resolution: window.devicePixelRatio || 1,
        antialias: true, //抗锯齿
    })

})

const initCanvas = () => {
    // let sprite = new PIXI.Sprite(textureList['1.jpg']);
    // app.value.stage.addChild(sprite)
    const text: any = new PIXI.Text("向上滑动，找回童年", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: 0xff8e00,
        align: "center",
        fontWeight: "bold",
    });
    // 设置文字位置
    text.x = app.value.screen.width / 2;
    text.y = 500;
    text.anchor.set(0.5);
    // text.moveTo(app.value.screen.width / 2, 500);
    // text.bezierCurveTo(app.value.screen.width / 2, 500, app.value.screen.width / 2),
    app.value.stage.addChild(text);

    //
    app.value.ticker.add((delta) => {
        let textY = Math.round(text.y);
        // console.log('帧数', textY);

        //文字上下运动 想用贝塞尔曲线 
        if (isTextMove.value) {
            if (textY >= 600) isTextMove.value = false;
            if (textY <= 600 && textY >= 530) text.y += 0.8 * delta;
            text.y += 1.1 * delta
        }

        if (!isTextMove.value) {
            if (textY <= 500) {
                isTextMove.value = true;
            }
            if (textY <= 600 && textY >= 550) text.y -= 1* delta;
            text.y -= 1.1 * delta
        }
        //Touch控制 文字显示隐藏
        
    })
}

const toShare = () => {
    commonHub.commit('pageChange', 'share')
}


</script>
