import {Howl, Howler} from 'howler';
import { getAssetsFile } from './utils';

const Audios = {} as anyObject;

Audios.bgm1 =  new Howl({ src: getAssetsFile('media/bgm.mp3'), loop: true });
// Audios.bgm1 =  new Howl({ src: '../../public/bgm.mp3', loop: true });

Audios.clickSe =  new Howl({ src: getAssetsFile('media/click.mp3'), loop: false });
// Audios.clickSe =  new Howl({ src: '../../public/click.mp3', loop: false });

Audios.nowBgm = Audios.bgm1;

Audios.setVolume = (volume) => {
    Howler.volume(volume)
}
Audios.changeBgm = (index: number) => {
    console.log('bgm', index);
    Audios.nowBgm.stop();
    Audios[`bgm${index}`].play();
    Audios.nowBgm = Audios[`bgm${index}`];
}
Audios.isMuted = false;
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // 打开媒体
        if (!Audios.isMuted) {
            Howler.mute(false);
        }
    } else {
        // 关闭媒体
        Howler.mute(true);
    }
});
Audios.changeMute = () => {
    if (Audios.isMuted) {
        Audios.isMuted = false;
        Howler.mute(false)
    } else {
        Audios.isMuted = true;
        Howler.mute(true)
    }
}
export default Audios;