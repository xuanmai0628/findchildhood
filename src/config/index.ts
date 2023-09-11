interface ConfigType{
    orientation: string,
    videoList: any,
    videoWorks: any,
    videoHaList: any[],
    video6List: any[],
    userInfo: any,
    isEndToWorks: boolean
}
const Config: ConfigType = {
    orientation: '',
    videoList: [],
    videoWorks: [],
    videoHaList: [],
    video6List: [],
    userInfo: {},
    isEndToWorks: false
}
export default Config