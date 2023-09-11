<style lang="less" scoped>
    .box-wrap {
        opacity: 0.5;
    }

    .data-wrap {
        pointer-events: none;
        color: #fff;
        margin: 0.1rem;
        font-weight: 800;
        background: rgba(0, 0, 0, 1);
        font-size: 0.2rem;
        z-index: 1;
        margin: 0.8rem 0 0 0.5rem;
        .data {
            display: block;
            margin: 0.1rem;
            white-space: nowrap;
        }
    }
</style>

<template>
	<div class="box-wrap" ref="boxRef" :style="style" @click="output" @contextmenu="() => false">
        <slot></slot>
        <div class="data-wrap abcter" v-if="debug">
            <text class="data data-x">x: {{ Math.round((x - initX) * ratio) }}</text>
            <text class="data data-y">y: {{ Math.round((y - initY) * ratio) }}</text>
            <text class="data data-width">w: {{  Math.round(width * ratio) }}</text>
            <text class="data data-height">h: {{  Math.round(height * ratio) }}</text>
        </div>
    </div>
</template>

<script setup lang="ts">
	import { computed, ref, onMounted } from 'vue';
    import { useDraggable, useElementSize } from '@vueuse/core';

    const props = withDefaults(defineProps<{
        type?: 'absolute'|'relative', // 定位方式
        ver?: 'top'|'center'|'bottom', // 垂直方向定位方式
        hor?: 'left'|'center'|'right', // 水平方向定位方式
        deltaX?: number, // 水平修正值
        deltaY?: number // 垂直修正值
        debug?: boolean // 调试模式
    }>(), {
        type: 'absolute',
        ver: 'center',
        hor: 'center',
        deltaX: 0,
        deltaY: 0,
        debug: true
    });

    const boxRef = ref<HTMLElement | null>(null);
    const ratio = 100 / parseFloat(document.documentElement.style.fontSize.replace('px', '')); // 屏幕像素比

    const initX = ref<number>(0);
    const initY= ref<number>(0);
    
    let horStyle = '';
    let verStyle = '';

    switch (props.hor) {
        case 'left':
            initX.value = 0;
            horStyle = 'left:0;'
            break;
        case 'center':
            initX.value = window.innerWidth / 2;
            horStyle = 'left:50%;'
            break;
        case 'right':
            initX.value = window.innerWidth;
            horStyle = 'right:0;'
            break;
    }

    switch (props.ver) {
        case 'top':
            initY.value = 0;
            verStyle = 'top:0;';
            break;
        case 'center':
            initY.value = window.innerHeight / 2;
            verStyle = 'top:50%;';
            break;
        case 'bottom':
            initY.value = window.innerHeight;
            verStyle = 'bottom:0;';
            break;
    }

    const { x, y } = useDraggable(boxRef, {
        initialValue: { x: initX.value + props.deltaX / ratio, y: initY.value + props.deltaY / ratio}
    })

    // if (props.debug) {
    //     const { x, y } = useDraggable(boxRef, {
    //         initialValue: { x: initX.value + props.deltaX / ratio, y: initY.value + props.deltaY / ratio}
    //     })
    // } else {
    //     const x = ref<number>(initX.value + props.deltaX / ratio);
    //     const y = ref<number>(initY.value + props.deltaY / ratio);
    // }

    const style = computed(() =>
        `position:${props.type};left:${x.value}px;top:${y.value}px;`
    );

    // 输出style文本
    const output = () => {
        let t1: string = '';
        let t2: string = '';

        let v1 = Math.floor((x.value - initX.value) * ratio);
        let v2 = Math.floor((y.value - initY.value) * ratio);

        switch (props.hor) {
            case 'left':
                t1 = `left:${v1}rpx;`;
                break;
            case 'center':
                t1 = `margin-left:${v1}rpx;`;
                break;
            case 'right':
                t1 = `right:${-v1}rpx;`;
                break;
        }

        switch (props.ver) {
            case 'top':
                t2 = `top:${v2}rpx;`;
                break;
            case 'center':
                t2 = `margin-top:${v2}rpx;`;
                break;
            case 'bottom':
                t2 = `bottom:${-v2}rpx;`;
                break;
        }

        // console.log(`style="${t1}${t2}"`);
        if (props.ver === 'center' && props.hor === 'center') {
            console.log(`margin: ${v2/100}rem 0 0 ${v1/100}rem;`)
        }
    }

    const { width, height } = useElementSize(boxRef);
</script>
