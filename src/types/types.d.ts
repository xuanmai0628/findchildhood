interface anyObject {
    [propName: string]: any;
}

interface DomObject {
    [propName: string]: HTMLElement;
}

interface numberObject {
    [propName: string]: number;
}

interface stringObject {
    [propName: string]: string;
}

interface booleanObject {
    [propName: string]: boolean;
}

// 图片配置
interface imgConfig {
    name: string,
    url: string,
    draw?: boolean // 是否需要配置跨域
    prefix?: string // 序列帧前缀名
    index?: number // 序列帧序号
}

// 序列帧配置
interface keyframeConfig {
    prefix: string, // 图片前缀
    path: string, // 图片路径
    type: string, // 图片格式
    start: number, // 开始序号
    end: number // 结束序号
}

interface directionalLightOption {
    intensity: number,
    position: THREE.Vector3,
}

interface pointLightOption {
    intensity: number,
    position: THREE.Vector3,
}

interface spotLightOption {
    intensity: number,
    position: THREE.Vector3,
    target: THREE.Vector3
}

interface rectLightOption {
    intensity: number,
    width: number,
    height: number,
    position: THREE.Vector3,
    target: THREE.Vector3
}

interface Window {
    showShareImg: Function
}

declare var PTTSendClick: any;
