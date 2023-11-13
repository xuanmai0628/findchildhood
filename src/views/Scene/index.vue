
<style lang="less" scoped>
@import './index.less';
</style>

<template>
    <div class="m-scene">
        <canvas ref="canvasDom" class="lcter scene-canvas" id="canvas"></canvas>

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
const canvasDom = ref(null)
commonHub.on('pageChange', (pageName) => {
    if (pageName === 'scene') {
        initCanvas()
    }
})


// 定义碎片的信息数组
const puzzleArr: any = [
    {
        id: 0,
        name: 'puzzle_item01.png',
        texture: textureList['puzzle_item01.png'],
        x: 620,
        y: 470,
    },
    {
        id: 1,
        name: 'puzzle_item02.png',
        texture: textureList['puzzle_item02.png'],
        x: 660,
        y: 280,
    },
    {
        id: 2,
        name: 'puzzle_item03.png',
        texture: textureList['puzzle_item03.png'],
        x: 980,
        y: 480,
    },
    {
        id: 3,
        name: 'puzzle_item04.png',
        texture: textureList['puzzle_item04.png'],
        x: 960,
        y: 300,
    },


]

onMounted(() => {
    app.value = new PIXI.Application({
        view: canvasDom.value,
        width: 1624,
        height: 750,
        backgroundColor: 0xb2b2b2,
        resolution: window.devicePixelRatio || 1,
        antialias: true, //抗锯齿
    });
});


// app容器
let content = null;
let dragTarget = null;

const puzzleContainer = new PIXI.Container();
const initCanvas = () => {
    content = app.value.stage;
    puzzleContainer.interactive = true;
    puzzleContainer.eventMode = 'static';
    content.addChild(puzzleContainer)
    console.log('看看', puzzleContainer);
    let contentSprite = new PIXI.Sprite(textureList['puzzle_content.png']);
    contentSprite.anchor.set(0.5);
    contentSprite.position.set(app.value.screen.width / 2, app.value.screen.height / 2);

    puzzleContainer.addChild(contentSprite)
    for (let i = 0; i < puzzleArr.length; i++) {
        createPuzzle(puzzleArr[i])

    }


};
const createPuzzle = function (item) {
    let { name, texture, x, y } = item
    const puzzle = new PIXI.Sprite(textureList[name]);
    puzzle.position.set(x, y);
    puzzle.anchor.set(0.5);
    puzzle.eventMode = "static";
    puzzle.interactive = true;
    puzzle.on("pointerdown", onPuzzleDown, puzzle)

    puzzleContainer.addChild(puzzle);
}


const onPuzzleDown = function (e) {
    console.log('看看伏击', puzzleContainer);
    // console.log('按下', puzzles);
    // console.log('按下', this);
    // console.log('按下', e);
    // console.log('按下', item);
    // // e.stopPropagation()
    // flag = true;
    // preX = e.data.global.x;
    // preY = e.data.global.y;
    dragTarget = this;
    // 这里让层级在最上面
    console.log( puzzleContainer.children.length - 1);
    puzzleContainer.setChildIndex(this, puzzleContainer.children.length - 1)
    console.log('按下看看', this);
    puzzleContainer.on("pointermove", onPuzzleMove);


}


const onPuzzleMove = function (e) {
    if (dragTarget) {
        dragTarget.parent.toLocal(e.data.global, null, dragTarget.position);
        // let currX = e.data.global.x - preX;
        // let currY = e.data.global.y - preY;
        // console.log(e.currentTarget);
        // e.currentTarget.x += currX
        // e.currentTarget.y += currY
        // preX = e.data.global.x
        // preY = e.data.global.y
    }

}


const onPuzzleUp = function (e) {
    console.log('起来');
    if (dragTarget) {
        puzzleContainer.off('pointermove', onPuzzleMove);
        dragTarget = null;
    }
    // this.position.set()

}
puzzleContainer.on('pointerup', onPuzzleUp);
puzzleContainer.on('pointerupoutside', onPuzzleUp);










// 保存画布为图片函数
const saveImg = () => {
    // 将canvas转换成base64的urlRL("image/png");
    let url = canvasDom.value.toDataURL("image/png");
    let blob = app.value.renderer.plugins.extract.image(app.value.stage).src;

    // console.log('看看这个url',url);
    // 把canvas 转化为图片
    ImgDom.src = blob;
    console.log('快快快快快快', blob);
    let arr = blob.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    // 通过以下方式将以上变量生成文件对象 三个参数分别为文件内容，文件名，文件类型
    let file = new File([u8arr], "filename", { type: mime });
    // 将文件对象通过a标签下载
    let aDom = document.createElement('a'); //创建一个a标签
    aDom.download = file.name; //设置文件名
    let href = URL.createObjectURL(file); // 将file对象转成UTF-16字符串
    aDom.href = href;// 放入href
    document.body.appendChild(aDom); //将a标签插入body
    aDom.click(); //触发a标签点击
    document.body.removeChild(aDom);// 删除a标签
    URL.revokeObjectURL(href); // 释放刚才生成的UTF-16字符串
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
