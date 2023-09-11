import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        path: '/src/assets/',
        imgsBuffer: {} as anyObject,
        shareImgBuffer: {} as anyObject,
        spineLoadPer: 0
    }),
    getters: {
        getImgBuffer: (state) => {
            return (name: string) => {
                if (state.imgsBuffer.hasOwnProperty(name)) {
                    return state.imgsBuffer[name]
                } else if (state.shareImgBuffer.hasOwnProperty(name)) {
                    return state.shareImgBuffer[name]
                } else {
                    console.error('imgBuffer not exist:', name)
                }
            };
        },
    },
    actions: {
        setImgsBuffer (buffer: anyObject) {
            this.imgsBuffer = buffer;
        },
        setShareImgBuffer (buffer: anyObject) {
            this.shareImgBuffer = buffer;
        },
    }
})

// 检查substribe的mutation里是否包含特定的key
export const checkKey = (mutation: any, key: string) => {
    let events = mutation.events;
    let hasKey = false;

    if (events instanceof Array) {
        events.forEach((event) => {
            if (event.key === key) {
                hasKey = true;
            }
        })
    } else if (events.key === key) {
        hasKey = true;
    }

    return hasKey;
}