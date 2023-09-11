import { browser } from './utils';
import { ref } from 'vue';

export default function useScale (defaultRatio = 7.5 / 16, min = 0.625, max = 1.6, className = '.scale-dom') {

    // 是否需要缩放 
    const needScale = ref<boolean>(false);
    
    // 获取缩放比例
    // const getScale = () => {
    //     let ratio = window.innerWidth / window.innerHeight;
    //     let de = defaultRatio;
    //     if (ratio < max && ratio > min) {
    //         let scale = 1;
    //         if (ratio > 1) {
    //             // 横屏
    //             scale = ratio / de;
    //         } else {
    //             scale = (1/de) / ratio;
    //         }
    //         console.log('scale:', scale)
    //         return scale;
    //     } else {
    //         return 0;
    //     }
    // }

    const getScale = () => {
        let ratio = window.innerWidth / window.innerHeight;
        let isiPad = browser.versions.iPad;
        
        // console.log('isMobile:', isMobile)
        let de = defaultRatio;
        if (isiPad) {
        // if (!isMobile) {
            let scale = 1;
        
            scale = de / ratio;
            // scale = ratio / de;
            // console.log('scale:', scale)
            // return 1 / scale;
            return scale
        } else {
            return 0;
        }
    }

    // 缩放dom，兼容ipad
    const resizeScreen = () => {
        const scale = getScale()
        let wrap: HTMLElement = document.querySelector('.m-wrap');

        if (scale > 0) {
            if (wrap && !wrap.classList.contains('scale-dom')) {
                wrap.classList.add('scale-dom');
            }
            if (wrap && !wrap.classList.contains('m-inner')) {
                wrap.classList.add('m-inner');
            }

            document.querySelectorAll(className).forEach((dom: HTMLElement) => {
                dom.style.webkitTransform = 'scale(' + scale + ') translate3d(-50%, -50%, 0)';
                dom.style.transform = 'scale(' + scale + ') translate3d(-50%, -50%, 0)';
            });
            needScale.value = true;
        } else {
            if (wrap && wrap.classList.contains('scale-dom')) {
                wrap.classList.remove('scale-dom');
            }
            if (wrap && wrap.classList.contains('m-inner')) {
                wrap.classList.remove('m-inner');
            }
            document.querySelectorAll(className).forEach((dom: HTMLElement) => {
                dom.style.webkitTransform = '';
                dom.style.transform = '';
            });
            needScale.value = false;
        }
    }

    const init = () => {
        window.addEventListener('resize', () => {
            resizeScreen();
            setTimeout(function () {
                resizeScreen();
            }, 300);
        })
        resizeScreen();
    }

    return { needScale, init }
}