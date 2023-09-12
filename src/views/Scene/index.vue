
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
// import AlloyTouch  from 'alloytouch'
import AlloyTouch from 'alloytouch'

const app = ref()
const textureList = PIXI.utils.TextureCache;

//定义是否向上还是向下
let isTextMove = ref(true)

//定义变量存按下位置和移动位置 来判断是上滑还是下滑
let touchStart = ref();
let touchY = ref();

// 动画数组
let bgAniTextures = ref([]);

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
        fontSize: 36,
        fill: 0xff8e0090,
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
    for (let i = 0; i < 50; i++) {
        console.log(i + 1);
        console.log(bgAniTextures.value);
        // let img:any = ;
        bgAniTextures.value.push(
            PIXI.BaseTexture.from(require('../../assets/autoLoad/707.png'))
        )

    }








    //动画
    app.value.ticker.add((delta) => {
        let textY = Math.round(text.y);
        // console.log('帧数', textY);
        //文字上下运动 想用贝塞尔曲线 
        if (isTextMove.value) {
            if (textY >= 600) isTextMove.value = false;
            if (textY <= 600 && textY >= 530) text.y += 0.8 * delta;
            text.y += 1 * delta
        }

        if (!isTextMove.value) {
            if (textY <= 500) {
                isTextMove.value = true;
            }
            if (textY <= 600 && textY >= 530) text.y -= 0.8 * delta;
            text.y -= 1 * delta
        }

    })
    //Touch控制 文字显示隐藏
    var target: any = document.querySelector(".scene-canvas");
    let num: any = ref(90)
    var alloyTouch = new AlloyTouch({
        touch: ".m-scene",//反馈触摸的dom
        vertical: true,//不必需，默认是true代表监听竖直方向touch
        target: { y: 0 }, //运动的对象
        property: "y",  //被运动的属性
        // min: 100, //不必需,运动属性的最小值
        // max: 2000, //不必需,滚动属性的最大值
        sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
        factor: 10,//不必需,表示触摸位移运动位移与被运动属性映射关系，默认值是1
        moveFactor: 1,//不必需,表示touchmove位移与被运动属性映射关系，默认值是1
        step: 45,//用于校正到step的整数倍
        bindSelf: false,
        maxSpeed: 2, //不必需，触摸反馈的最大速度限制 
        value: 0,
        change: function (value: any) {
            // target.style.transform = "translate(0," + value + "px)"
            // target.style.webkitTransform = "translate(0," + value + "px)"
        },
        touchStart: function (evt, value) {
            console.log('start', evt.touches[0].clientY);
            touchStart.value = evt.touches[0].clientY;
        },
        touchMove: function (evt, value) {
            // console.log('touchMove', evt);
            console.log(evt.touches[0].clientY);
            touchY.value = evt.touches[0].clientY;

            if (touchY.value > touchStart.value) {
                console.log('向下滑');
                if (num.value <= 90) {
                    num.value += 2;
                    text.style.fill = `0xff8e00${num.value < 10 ? '0' + num.value : num.value}`;
                    app.value.stage.addChild(text);
                }
            } else {
                console.log('向上滑');
                if (num.value > 0) {
                    num.value -= 2;
                    text.style.fill = `0xff8e00${num.value < 10 ? '0' + num.value : num.value}`;
                    app.value.stage.addChild(text);
                } else {
                    console.log('透明度没有了可以显示人物了');
                }
            }
        },
        touchEnd: function (evt, value) {
            // console.log('touchEnd',evt,'touchEnd',value);

        },
        tap: function (evt, value) {
            // console.log('tap',evt,'tap',value);

        },
        pressMove: function (evt, value) {
            // console.log('pressMove', evt, 'pressMove', value);

        },
        animationEnd: function (value) {
            // console.log('运动结束', value);
        } //运动结束
    })
    alloyTouch.to(target);



}

const toShare = () => {
    commonHub.commit('pageChange', 'share')
}


</script>
