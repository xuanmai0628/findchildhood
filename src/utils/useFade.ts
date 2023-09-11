import { wait } from './utils';
import { ref } from 'vue';

export default function useFade (pageName?: string, isShow?: boolean, opacity?: number) {
    const initOpacity = opacity || 1;
    const isPageShow = ref<boolean>(isShow?true:false);
    const pageOpacity = ref<number>(isShow?initOpacity:0);
    let fadeDuration = 400; // 动画时长

    async function fadeIn (cb?: Function) {
        isPageShow.value = true;
		await wait();
		pageOpacity.value = initOpacity;
        await wait (fadeDuration);
        cb && cb();
    }

    async function fadeOut (cb?: Function) {
        pageOpacity.value = 0;
		await wait(fadeDuration);
		isPageShow.value = false;
        cb && cb();
    }

    return { isPageShow, pageOpacity, fadeDuration, fadeIn, fadeOut }
}