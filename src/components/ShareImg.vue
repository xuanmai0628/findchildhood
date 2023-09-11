<style scoped lang="less">
    .m-share {
        // background-color: rgba(0, 0, 0, 0.7);
        z-index: 1;
        transform: translateZ(0);

        &.small {
            transform: translateZ(0) scale(0.93);

            .share-mask {
                transform: translateZ(0) scale(1.08);
            }
        }
       
    }
    .share-mask {
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        transform: translateZ(0);
    }
    .share-canvas, .share-img {
        height: 100vh;
    }
    .share-canvas {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    .share-float {
        pointer-events: none;

        .share-bg, .share-window-img {
            width: 16.24rem;
            height: 7.5rem;
        }
    }

    .share-img {
        opacity: 0;
        width: 12.3rem;
        height: 5.9rem;
        transform: translateZ(0);
        margin: -3.1rem 0 0 -6.4rem;
    }

    .btn-close {
        margin: -3.12rem 0 0 5.8rem;
        transform: translateZ(0);
    }


    .share-loading {
        background-color: rgba(0,0,0,.6);
        .loading-circle {
            width: 0.6rem;
            height: 0.6rem;
            border-top: 3Px solid #fff;
            border-left: 3Px solid #fff;
            border-bottom: 3Px solid transparent;
            border-right: 3Px solid transparent;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.3rem 0 0 -0.3rem;
            animation: rotate 1s infinite linear;
        }
    }
</style>

<template>
    <div class="m-share absf transition-opacity" v-show="isPageShow" :style="{ opacity: pageOpacity }">
        <div class="share-mask absf"></div>
        <canvas id="shareCanvas" class="share-canvas" width="750" height="1624"></canvas>
        <div class="share-float absf">
        </div>
        <img class="share-img abc" :src="shareImgUrl" alt="分享图">
        <button class="btn-close img_btn_close abc" @click.stop="closeShare"></button>
        <div class="share-loading absf" v-show="isLoading">
            <div class="loading-circle abcter"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, computed, reactive, getCurrentInstance, ComponentInternalInstance, onMounted, ComputedRef } from 'vue'
import { wait } from '../utils/utils'
import useFade from '../utils/useFade'
import { checkKey, useStore } from '../store'

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const store = useStore()

const { isPageShow, pageOpacity, fadeIn, fadeOut, fadeDuration } = useFade('share', false);
const shareImgUrl = ref<string>('')
const isLoading = ref<boolean>(false)

// const props = defineProps<{
// }>()

const emits = defineEmits<{
    (e: 'closeSharePage'): void,
    (e: 'updateShareUrl', url: string): void
}>()

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const drawImg = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width?: number, height?: number) => {
    if (width && height) {
        ctx.drawImage(img, x, y, width, height)
    } else {
        ctx.drawImage(img, x, y)
    }
}

const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font?: string) => {
    ctx.fillStyle = '#b77f41';
    ctx.font = font || 'normal 32px Arial';
    ctx.fillText(text, x, y);
}

const drawVerTextArr = (ctx: CanvasRenderingContext2D, text: string[], x: number, y: number, fontSize: number) => {
    ctx.fillStyle = '#b77f41';
    ctx.font = `normal ${fontSize}px Arial`;
    
    let fontHeight = 36;
    let fontWidth = 52;

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            ctx.fillText(text[i][j], x + fontWidth * i, y + fontHeight * j);
        }
    }
}

const loadImg = (index, url) => {
    const img = new Image();

    img.src = url;
    img.crossOrigin = 'anonymous';

    return new Promise(resolve => {
        img.onload = () => {
            // console.log('load img success:', name);
            resolve(img);
        }
        img.onerror = () => {
            console.log('load img error:', name);
            resolve(null);
        }
    })
}

const drawHandler = async (index: number, ctx: CanvasRenderingContext2D) => {
    isLoading.value = true;
    // ctx.clearRect(0, 0, 1624, 750);
    // const bgImg = store.getImgBuffer('share_bg.png');
    // drawImg(ctx, bgImg, 0, 0);

    isLoading.value = false;
}

const exportImg = (canvas: HTMLCanvasElement) => {
    return canvas.toDataURL('jpg', 9);
}

const updateShareUrl = () => {
    emits('updateShareUrl', shareImgUrl.value)
}

const closeShare = () => {
    fadeOut()
}

onMounted(() => {
    canvas = document.querySelector('#shareCanvas')
    ctx = canvas.getContext('2d');

    // store.$subscribe(async (mutation, state) => {
	// 	// console.log('mutation:', mutation)
	// 	if (checkKey(mutation, 'imgsBuffer')) {
    //         await drawHandler(props.endId + 15, ctx)
    //         shareImgUrl.value = exportImg(canvas);
    //     }
	// })
})

watch(shareImgUrl, () => {
    updateShareUrl()
})

// watch(props, async () => {
//     console.log(props);
// })

defineExpose({
    drawHandler,
    fadeIn,
    fadeOut,
})

</script>
