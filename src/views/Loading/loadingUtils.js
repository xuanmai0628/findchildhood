import { Loader } from 'pixi.js'
import {getAssetsFile} from '../../utils/utils'
export function formatImgList() {
  // @ts-ignore
  const context = import.meta.glob('../../assets/autoLoad/*')
  // require.context('../../assets/autoLoad/', true)
    const imgList = Object.keys(context)
    const list = []
for (let i = 0; i < imgList.length; i++) {
  const strIndex = imgList[i].lastIndexOf('/')
  
  const name = imgList[i].slice(strIndex + 1)
  list.push({
    name: name.slice(0, imgList[i].lastIndexOf('.') - 2),
      url: getAssetsFile('autoLoad/' + name)
    // require('../../assets/autoLoad/' + name)
  })
}
  return list
}

export function delayImgList() {
  // @ts-ignore
    // @ts-ignore
  const context = import.meta.glob('../../assets/delayLoad/*')
  // require.context('../../assets/autoLoad/', true)
    const imgList = Object.keys(context)
    const list = []
for (let i = 0; i < imgList.length; i++) {
  const strIndex = imgList[i].lastIndexOf('/')
  
  const name = imgList[i].slice(strIndex + 1)
  list.push({
    name: name.slice(0, imgList[i].lastIndexOf('.') - 2),
      url: getAssetsFile('delayLoad/' + name)
    // require('../../assets/autoLoad/' + name)
  })
}
  return list
}

export async function pixiLoading(imgUrlList, cb) {
  const loader = new Loader()
//   loader.onStart.add(() => console.log('pixi加载'))
  return new Promise((resolve) => {
    loader.add(imgUrlList).load(async(res) => {
      console.log(res.resources)
      //   commonHub.set('textureList', res.resources)
      resolve(res.resources)
    }).onProgress.add((params) => {
      cb && cb(params.progress)
    })
  })
}

export function imgLoading(imgUrlList, cb) {
  let progress = 0
  let count = 0
  const imgList = {
    imgs: {}
  }
  const length = imgUrlList.length
  return new Promise((resolve) => {
    imgUrlList.map((item) => {
      const imgSuccessFn = function() {
        count++
        imgList.imgs[this.bufferName] = this
        if (count === length) {
          progress = 100
          console.log('加载完成:', progress)
          resolve(null)
        } else {
          progress = Math.round(count / length * 100)
          console.log('加载中:', progress)
        }
        cb && cb(progress)
      }
      const img = new Image()
      img.onload = img.onerror = imgSuccessFn
      img.bufferName = item.name
      if (item.crossOrigin === true) {
        img.crossOrigin = 'anonymous'
      }
      img.src = item.url
    })
  })
}
