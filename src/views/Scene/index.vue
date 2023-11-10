
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div class="m-scene">
        <canvas class="lcter scene-canvas" id="canvas"></canvas>
        <div class="scene-confirm tcter"></div>
        <div class="scene-side lcter">
            <div class="scene-item-active" :style="{ left: itemActiPosi + 'rem' }" v-show="listShow" alt=""></div>
            <div class="scene-item" v-for="item in itemArr" :key="item.id" @click="onItem(item)">
                <img class="item-img" :src="item.img" alt="">
            </div>
            <div class="scene-list scene-list-1" v-show="listShow == 1">
                <div class="scene-content" v-for="(item, index) in contentArr[0]" @click="onFigure(item)">
                    <div :class="`item-img item-img-${index}`"></div>
                </div>
            </div>
            <div class="scene-list scene-list-2" v-show="listShow == 2">
                <div class="scene-content" v-for="(item, index) in contentArr[1]" @click="onBgContent(item)">
                    <div :class="`item-img item-img-${index}`"></div>
                </div>
            </div>
            <div class="scene-list scene-list-3" v-show="listShow == 3">
                <div class="scene-content" v-for="(item, index) in contentArr[2]" @click="onSticker(item)">
                    <div :class="`item-img item-img-${index}`"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { commonHub } from '../../utils/commonHub.js'
import * as PIXI from 'pixi.js'
import { onMounted, ref } from 'vue'
// import AlloyTouch  from 'alloytouch'
import AlloyTouch from 'alloytouch'
import { JSONStringify } from 'lib/tool'

const app = ref()
const textureList = PIXI.utils.TextureCache;

commonHub.on('pageChange', (pageName) => {
    if (pageName === 'scene') {
        initCanvas()
    }
})
let itemActiPosi = ref(1.2);
const itemArr = [
    {
        id: 1,
        name: "摆个动作",
        img: new URL("../../assets/autoLoad/btn_action.png", import.meta.url).href,
        activePosition: 1.2,
    },
    {
        id: 2,
        name: "选择场景",
        img: new URL("../../assets/autoLoad/btn_scene.png", import.meta.url).href,
        activePosition: 3.9,
    },
    {
        id: 3,
        name: "贴吉祥话",
        img: new URL("../../assets/autoLoad/btn_element.png", import.meta.url).href,
        activePosition: 6.6,
    }
];
let listShow = ref(1)
const contentArr = ref([
    [
        {
            id: 1,
            name: '动作1',
            img: new URL("../../assets/autoLoad/action_1.png", import.meta.url).href,
            textureName: "action_spr1.png",
            x: 174,
            y: 116
        },
        {
            id: 2,
            name: '动作2',
            img: new URL("../../assets/autoLoad/action_2.png", import.meta.url).href,
            textureName: "action_spr2.png",
            x: 304,
            y: 0,
        },
        {
            id: 3,
            name: '动作3',
            img: new URL("../../assets/autoLoad/action_3.png", import.meta.url).href,
            textureName: "action_spr3.png",
            x: 280,
            y: 6,
        },
        {
            id: 4,
            name: '动作4',
            img: new URL("../../assets/autoLoad/action_4.png", import.meta.url).href,
            textureName: "action_spr4.png",
            x: 180,
            y: 50,
        },
        {
            id: 5,
            name: '动作5',
            img: new URL("../../assets/autoLoad/action_5.png", import.meta.url).href,
            textureName: "action_spr5.png",
            x: 68,
            y: 70,
        },
    ], [
        {
            id: 1,
            name: '场景1',
            img: new URL("../../assets/autoLoad/scene_1.png", import.meta.url).href,
            textureName: "scene_spr1.jpg",
        },
        {
            id: 2,
            name: '场景2',
            img: new URL("../../assets/autoLoad/scene_2.png", import.meta.url).href,
            textureName: 'scene_spr2.jpg',
        },
        {
            id: 3,
            name: '场景3',
            img: new URL("../../assets/autoLoad/scene_3.png", import.meta.url).href,
            textureName: 'scene_spr3.jpg',
        },

    ], [
        {
            id: 1,
            name: '吉祥话1',
            img: new URL("../../assets/autoLoad/element_1.png", import.meta.url).href,
            textureName: "element_spr1.png",
            x: 290,
            y: 96
        },
        {
            id: 2,
            name: '吉祥话2',
            img: new URL("../../assets/autoLoad/element_2.png", import.meta.url).href,
            textureName: "element_spr2.png",
            x: 292,
            y: 122
        },
        {
            id: 3,
            name: '吉祥话3',
            img: new URL("../../assets/autoLoad/element_3.png", import.meta.url).href,
            textureName: "element_spr3.png",
            x: 304,
            y: 92
        },
        {
            id: 4,
            name: '吉祥话4',
            img: new URL("../../assets/autoLoad/element_4.png", import.meta.url).href,
            textureName: "element_spr4.png",
            x: 256,
            y: 92
        },
        {
            id: 5,
            name: '吉祥话5',
            img: new URL("../../assets/autoLoad/element_5.png", import.meta.url).href,
            textureName: "element_spr5.png",
            x: 30,
            y: 460
        },
        {
            id: 6,
            name: '吉祥话6',
            img: new URL("../../assets/autoLoad/element_6.png", import.meta.url).href,
            textureName: "element_spr6.png",
            x: 30,
            y: 440
        },
        {
            id: 7,
            name: '吉祥话7',
            img: new URL("../../assets/autoLoad/element_7.png", import.meta.url).href,
            textureName: "element_spr7.png",
            x: 30,
            y: 460
        },
    ]
]);

onMounted(() => {
    app.value = new PIXI.Application({
        view: document.querySelector('.scene-canvas'),
        width: 1624,
        height: 750,
        backgroundColor: 0xffffff,
        resolution: window.devicePixelRatio || 1,
        antialias: true, //抗锯齿
    })
})
// app容器
let content = null;

// 三种类型的精灵
let figureSprite = null;
let bgSprite = null;

let coupletSprite = null;
let stickerSprite = null;

// 矩形
let graphics = null;
let closeIcon = null;

// 为最后三个贴纸创建一个容器
const stickerContainer = new PIXI.Container();
// 关闭按钮
let closeFlag = false;
const initCanvas = () => {
    content = app.value.stage;
    content.interactive = true;
    content.eventMode = 'static';
    content.hitArea = app.value.screen;
    content.on("pointerdown", function (e) {
        e.stopPropagation();
        content.off("pointermove")
        console.log('主要容器');
        closeFlag = false;
        // 隐藏线条和图标
        graphics.visible = false;
        closeIcon.visible = false;

    })

    // console.log(content);
    // 背景
    bgSprite = new PIXI.Sprite(textureList['scene_spr1.jpg']);
    // sprite.scale.set(0.5);
    bgSprite.width = app.value.screen.width;
    bgSprite.height = app.value.screen.height;
    content.addChild(bgSprite)

    // 人物
    figureSprite = new PIXI.Sprite(textureList["action_spr1.png"]);
    figureSprite.position.set(174, 116)
    content.addChild(figureSprite)

    // 吉祥话
    coupletSprite = new PIXI.Sprite(textureList["element_spr1.png"]);
    coupletSprite.position.set(290, 96)
    content.addChild(coupletSprite)



    // 容器
    stickerContainer.interactive = true;
    stickerContainer.visible = false;
    // stickerContainer
    content.addChild(stickerContainer)


    stickerSprite = new PIXI.Sprite(textureList["element_spr5.png"]);
    // stickerSprite.anchor.set(0.5);
    stickerContainer.addChild(stickerSprite)
    console.log('加载纹理', textureList);

    // 画矩形
    graphics = new PIXI.Graphics();
    stickerSprite.addChild(graphics)
    console.log('看看是大喊大叫', stickerContainer.width, stickerContainer.height);



    //放大缩小图标
    closeIcon = new PIXI.Sprite(textureList["btn_scale.png"]);
    closeIcon.scale.set(1.2)
    closeIcon.zIndex = 99;
    closeIcon.anchor.set(0.5);
    closeIcon.rotation = Math.PI / 2;
    closeIcon.eventMode = "static";
    closeIcon.interactive = true;
    // closeIcon.buttonMode = true;
    stickerSprite.addChild(closeIcon)
}
// 分类事件
const onItem = (item) => {
    itemActiPosi.value = item.activePosition
    listShow.value = item.id
}

// 每一个栏目的事件
const onFigure = (item) => {
    listShow.value = 0;
    let { textureName, x, y } = item;
    checkoutFigure(textureName, x, y);
}

const onBgContent = (item) => {
    listShow.value = 0;
    console.log(item);
    checkoutBg(item.textureName);
}
const onSticker = (item) => {
    listShow.value = 0;
    let { textureName, x, y, id } = item;
    checkoutSricker(textureName, x, y, id);
}

// 对应的切换事件
// 切换人物贴纸
const checkoutFigure = (name, x, y) => {
    figureSprite.texture = textureList[name];
    figureSprite.position.set(x, y)
}

// 切换背景
const checkoutBg = (name) => {
    bgSprite.texture = textureList[name];
}

// 为什么要定义这两个变量 可能是因为作用域问题吧 
// 封装了 checkEventListener函数 但出现首次点击后 
// 切换别的贴纸 变量的值没有改变
let srickerX;
let srickerY;
// 切换对联
const checkoutSricker = function (name, x1, y1, id) {

    if (id < 5) {
        graphics.clear()
        // 两个精灵之间的显示隐藏
        coupletSprite.visible = true;
        stickerContainer.visible = false

        coupletSprite.texture = textureList[name];
        coupletSprite.position.set(x1, y1)
    } else {
        console.log('贴纸');

        stickerContainer.position.set(10, 240);
        // 两个精灵之间的显示隐藏
        coupletSprite.visible = false;
        stickerContainer.visible = true;
        stickerSprite.texture = textureList[name];
        stickerSprite.scale.set(1)
        stickerSprite.position.set(stickerContainer.x, stickerContainer.y)
        console.log("精灵的框高", stickerSprite.width, stickerSprite.height);

        // 容器聚集
        // checkEventListener(stickerContainer, "pointerdown", (e) => {
        //     e.stopPropagation();
        //     // console.log('点击了贴纸容器', e);
        //     // 已经画上矩形了就无需再重复执行了
        //     if (graphics.height) return
        //     // 矩形
        //     graphics.clear()
        //     graphics.lineStyle(4, 0xFFFFFF, 4);
        //     graphics.drawRect(srickerX - 10, srickerY - 10, stickerSprite.width + 20, stickerSprite.height + 20);
        //     graphics.endFill();
        //     closeIcon.visible = true;
        // });
        stickerContainer.off("pointerdown");
        stickerContainer.off("pointerup");
        let dragging = false;
        let prevX, prevY;
        stickerContainer.on("pointerdown", (e) => {
            console.log('父容器按下');
            e.stopPropagation();
            // console.log('点击了贴纸容器', e);
            dragging = true;
            prevX = e.data.global.x;
            prevY = e.data.global.y;
            // console.log('看看首次按下存下来的数值',prevX,prevY);
            // 矩形
            // 已经画上矩形了就无需再重复执行了
            // if (graphics.height) return
            // graphics.clear()
            // graphics.lineStyle(4, 0xFFFFFF, 4);
            // graphics.drawRect(stickerSprite.x - 10, stickerSprite.y - 10, stickerSprite.width + 20, stickerSprite.height + 20);
            // graphics.endFill();
            graphics.visible = true;
            closeIcon.visible = true;
        })
        stickerContainer.on('pointerup', () => {
            dragging = false;
            closeFlag = false;
            console.log('父容器鼠标up');
        });
        // stickerContainer.on('pointerupoutside', () => {
        //     dragging = false;
        // });
        stickerContainer.on("pointermove", function (e) {
            if (dragging) {
                const dx = e.data.global.x - prevX;
                const dy = e.data.global.y - prevY;
                stickerContainer.x += dx;
                stickerContainer.y += dy;
                prevX = e.data.global.x;
                prevY = e.data.global.y;
            }
        })
        // console.log('每次切换查看container容器的框高',stickerContainer.width,  stickerContainer.height);
        // 矩形



        closeIcon.visible = true;
        closeIcon.position.set(stickerSprite.width + 20, -10);
        closeIcon.off("pointerdown")
        closeIcon.off("pointermove")
        closeIcon.off("pointerup")

        console.log('每次切换查看container容器的框高222', stickerContainer.width, stickerContainer.height);
        let iconScale = { x: null, y: null, x2: null, y2: null };
        let spriteMag = {
            x: null,
            y: null,
            scale: 1
        };
        closeIcon.on("pointerdown", function (e) {
            console.log('关闭按钮', e);
            console.log(this);
            // 阻止传播默认事件
            e.stopPropagation();
            closeFlag = true;
            console.log('看看我要看的', e.data.originalEvent.changedTouches[0].clientX, e.data.originalEvent.changedTouches[0].clientY);
            // 获取按下的初始位置
            iconScale.x = e.data.originalEvent.changedTouches[0].clientX;
            iconScale.y = e.data.originalEvent.changedTouches[0].clientY;

            iconScale.x2 = iconScale.x - stickerSprite.width / 2;
            iconScale.y2 = iconScale.y + stickerSprite.height / 2;

            spriteMag.scale = stickerSprite.scale.x;
        })
        let cs = null;
        closeIcon.on("pointermove", function (e) {
            if (closeFlag) {
                // console.log('关闭按钮移动中', e.data);
                // console.log(Math.random() * 10);
                let x3 = iconScale.x;
                let y3 = iconScale.y;
                let x4 = iconScale.x2;
                let y4 = iconScale.y2;
                let scaleX = e.data.originalEvent.changedTouches[0].clientX;
                let scaleY = e.data.originalEvent.changedTouches[0].clientY;
                let distance = (x1, x2, y1, y2) => {
                    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                };
                var s = distance(x3, x4, y3, y4);
                var r = distance(scaleX, x4, scaleY, y4);
                console.log('快快快快快快',s,r);
                var scale = Math.min(1.5, Math.max(0.5, r / s));
                console.log(scale);
                console.log(stickerSprite.scale);
                // if(stickerSprite.scale.x>=1.2 ||stickerSprite.scale.x<=0.8)return;
                stickerSprite.scale.set(scale * spriteMag.scale, scale * spriteMag.scale);

            }

        })

        closeIcon.on("pointerup", function (e) {
            closeFlag = false;
            console.log("关闭图标解除鼠标移动事件");
        })

        graphics.clear()
        graphics.lineStyle(4, 0xFFFFFF, 4);
        graphics.drawRect(0, -10, stickerContainer.width - 20, stickerContainer.height);
        graphics.endFill();
        // checkEventListener(closeIcon, "pointerdown", function (e) {
        //     console.log('关闭按钮', e);
        //     console.log(this);
        //     console.log(srickerX, srickerY);
        //     console.log(stickerContainer);
        //     // 阻止传播默认事件
        //     e.stopPropagation();
        //     // e.stopPropagationHint = true;
        //     checkEventListener(closeIcon, "pointermove", function (e) {
        //         console.log('关闭按钮移动中', e);

        //     })
        // });

    }
}

/** 
 * 添加事件监听
 * @param -对象
 * @param -事件类型
 * @param -执行函数
*/
const checkEventListener = function (object, type, callback) {
    if (!object.listenerCount(type)) {
        // console.log('添加事件成功');
        object.on(type, callback);
    } else {
        // console.log('事件已经存在所以解绑');
        object.off(type, callback);
    }
}

const toShare = () => {
    commonHub.commit('pageChange', 'share')
}


</script>
