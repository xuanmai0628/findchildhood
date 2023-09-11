<template>
    <div class="pixi-canvas transition-opacity" v-show="isPageShow" :style="{ opacity: pageOpacity }">
        <div class="ui-wrap absf">
        </div>
        <canvas class="absf"></canvas>
    </div>
</template>

<style lang="less" scoped>

    .ui-wrap {
        // background-color: rgba(0, 0, 0, 0.85);
        transform: translateZ(0);

        .mask {
            position: fixed;
            background-color: rgba(0, 0, 0, 0.85);
            pointer-events: none;
            transform: translateZ(0);
        }
        .spine-bg {
            position: fixed;
            pointer-events: none;
        }
    }
    .pixi-canvas {
        position: absolute;
        width: 16.24rem;
        height: 7.5rem;
        transform: translate3d(-50%,-50%,0);
        top: 50%;
        left: 50%;
        canvas {
            pointer-events: none;
        }

        &.ban {
            pointer-events: none;
        }
    }

    @media all and (orientation: portrait) {
        .pixi-canvas {
            canvas {
                position: absolute;
                top: 100%;
                left: 0;
                transform-origin: 0 0;
                transform: rotateZ(-90deg);
            }
        }
    }
</style>

<script setup lang="ts">
    import PX from '../utils/PX';
    import * as PIXI from 'pixi.js';
    import { Spine } from 'pixi-spine';
    import { onMounted, ref } from 'vue';
    import useFade from '../utils/useFade'
    import { wait } from '../utils/utils';
    import { useStore } from '../store';

    const store = useStore()

    const { isPageShow, pageOpacity, fadeIn, fadeOut, fadeDuration } = useFade('spine', false)

    const containers = {
        book: new PIXI.Container(),
    }

    const spines = {
        book: null,
    }

    const loader = PIXI.Loader.shared;

    const getSpine = (name: string) => {
        if (spines[name]) {
            return spines[name]
        } else {
            return null
        }
    }

    const showSpine = (name: string) => {
        if (containers[name]) {
            containers[name].visible = true;
        }
        fadeIn();
    }

    const hideSpine = async (name: string) => {
        console.log('spine fadeOut:', new Date().getTime())
        fadeOut()
        await wait(fadeDuration);
        if (containers[name]) {
            containers[name].visible = false;
        }
    }

    const playAnim = (spine: any, name: string, isLoop = true) => {
        if (spine.state.hasAnimation(name)) {
            spine.next = spine.state.setAnimation(0, name, isLoop);
            spine.animationNow = name;

            return new Promise(resolve => {
                spine.state.onEnd = () => {
                    console.log('spine anim end:', name);
                    resolve(true)
                }
            })
        }
    }

    const initBook = () => {
        containers.book.addChild(spines.book);
        containers.book.visible = false;
        PX.app.stage.addChild(containers.book)
    }

    const onLoadHandler = async (loader, resources) => {
        // console.log('resources', resources)
        spines.book = new Spine(resources['book1'].spineData)

        initBook()

        PX.app.start();

        store.$state.spineLoadPer = 100;
    }

    onMounted(() => {
        if (!loader.resources.hasOwnProperty('book')) {
            PX.init(document.querySelector('.pixi-canvas canvas'), 1624, 750);
            loader.onStart.add(() => console.log('begin load'));
            loader.add('book', `${process.env.BASE_URL}spine/book.json`)
            .load(onLoadHandler)

            loader.onProgress.add((e) => {
                // console.log(e.progress)
                store.$state.spineLoadPer = Math.round(e.progress)
            })
        } else {
            // 热更新时会保留加载好的资源 只需要直接初始化
            PX.init(document.querySelector('.pixi-canvas canvas'), 1624, 750);
            onLoadHandler(loader, loader.resources)
        }
    })

    defineExpose({
        getSpine,
        showSpine,
        hideSpine,
    })

</script>