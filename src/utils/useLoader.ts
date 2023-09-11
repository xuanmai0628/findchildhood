import { ref } from 'vue';

export default function useLoader (imgUrls: imgConfig[]) {
    const loadPer = ref<number>(0); // 加载进度
	let loadNum: number = 0,  // 已加载图片数
		sumNum: number = imgUrls.length, // 加载图片总数
        percent: number = 0; // 实际加载进度
	const imgsBuffer: any = {}; // 图片缓存
	const kfsBuffer: any = {}; // 逐帧缓存

    let onProgress: Function | undefined; // 进度回调函数
    let onLoad: Function | undefined; // 加载完毕回调函数

    const setOnProgress = (value: Function) => {
        onProgress = value;
    }

    const setOnLoad = (value: Function) => {
        onLoad = value;
    }

    const updateLoadPer = () => {
		percent = Math.floor(loadNum / sumNum * 100);
		loadPer.value = percent < 100? percent : 99;
		onProgress && onProgress();

        if (percent >= 100) {
            onLoad && onLoad();
            onLoad = undefined;
        }
	}

    const loadImage = (config: imgConfig) => {
		let { name, url, draw = false, prefix = '', index = -1 } = config;
		const img = new Image();

		img.src = url;
		draw === true && (img.crossOrigin = 'anonymous');

		img.onload = () => {
			// console.log('load img success:', name);
			loadNum++;
			if (prefix === '') {
				imgsBuffer[name] = img;
			} else {
				kfsBuffer[prefix] === undefined && (kfsBuffer[prefix] = []);
				(index >= 0) && (kfsBuffer[prefix][index] = img);
			}
			updateLoadPer();
		}
		img.onerror = () => {
			console.log('load img error:', name);
			loadNum++;
			imgsBuffer[name] = null;
			updateLoadPer();
		}
	}

    const load = () => {
		if (imgUrls.length === 0) {
			loadPer.value = 100;
			onLoad && onLoad();
            onLoad = undefined;
		} else {
			imgUrls.forEach((config: imgConfig) => {
				// console.log(name, url);
				loadImage(config);
			})
		}
    }

    return { loadPer, imgsBuffer, kfsBuffer, setOnProgress, setOnLoad, load };
}