// 延时执行
export const wait = (duration: number = 50) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, duration);
    })
}

// 绘制用户头像
export const drawAvatar = (ctx: CanvasRenderingContext2D, img: any, x: number, y: number, w: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + w, y + w, w, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w * 2, w * 2);
    ctx.restore();
}

// 绘制带背景色用户头像
export const drawAvatarWithBg = (ctx: CanvasRenderingContext2D, img: any, x: number, y: number, w: number) => {
    ctx.fillStyle = "#a4b8c0";
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + w, y + w, w, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.clip(); 

    ctx.beginPath();
    ctx.arc(x + w, y + w, w - 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x + 2, y + 2, w * 2 - 4, w * 2 - 4);
    ctx.restore();
}

// 获取链接参数
export const getQuery = (name: string, url: string = location.search) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]?' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 数字添加逗点
export const addComma = (number: number) : string => {
    let string = number.toString();
    if (number < 1000) {
        return string;
    } else {
        return string.replace(/(?=(?:\d{3})+$)/g, ',').replace(/^,/, '')
    }
}

/** 获取m~n的随机数, 取整方向floor or ceil 默认floor */
export const getRandom = (m, n, isFloor = true) => {
    return isFloor ? Math.floor(Math.random() * (n - m) + m) : Math.ceil(Math.random() * (n - m) + m)
}
/*
判断访问终端和语言
    使用：
    if ( push.browser.versions.qq ) {
        console.log('go go');
    }
    注意BUG：在微信内TD.browser.versions.qq也会返回true；
    解决：在判断手Q之后加上微信判断；
*/
export const browser = {
    versions: (function () {
        var u: any = navigator.userAgent;
        // var app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
            qq: u.match(/QQ/i) === 'QQ', // 是否QQ
            iosVer: u.toLowerCase().match(/cpu iphone os (.*?) like mac os/),
            androidVer: u.toLowerCase().match(/android (.*?);/)
        };
    })(),
    language: (navigator.language).toLowerCase()
};

/**
 * 打乱数组，返回打乱后的新数组，不改变原数组
 * @param {array} arr 目标
 * @param {number} count 指定返回数量 默认全部
 */
 export const shuffleArr = (arr: Array<any>, count: number) => {
    let m = arr.length;
    let i: number;
    let min = count ? (m - count) : 0;
    while (m) {
        i = (Math.random() * m--) >>> min;
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(min);
 };

/** 节流 */
export const throttle = (fn, delay) => {
    let timeout, that, args
    return function () {
        args = arguments
        that = this
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(that, args)
                console.log(11111);
                
            }, delay);
        }
    }
 }

/**
 * 深复制拷贝对象
 * @param source object
 */
 export const clone = (source: any): any => {
    if (typeof source !== 'object') return source;

    let target: any;

    if (source instanceof Array) {
        target = [];
        for (let i = 0; i < source.length; i++) {
            // 避免一层死循环 a.b = a
            target[i] = source[i] === source ? target : clone(source[i]);
        }
    } else if (source instanceof Object) {
        target = {};
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                // 避免一层死循环 a.b = a
                target[key] = source[key] === source ? target : clone(source[key]);
            }
        }
    }
    return target;
};

// 转换阿拉伯数字为中文
export const convertNumToChinese = (num: number) => {
    var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');    
    var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值    

    if(!num || isNaN(num)){        
        return "零";    
    }    

    var english = num.toString().split("")    
    var result = "";    
    for (var i = 0; i < english.length; i++) {        

        var des_i = english.length - 1 - i;//倒序排列设值        

        result = arr2[i] + result;        

        var arr1_index = english[des_i];        

        result = arr1[arr1_index] + result;    

    }    

    //将【零千、零百】换成【零】 【十零】换成【十】    
    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');    

    //合并中间多个零为一个零    
    result = result.replace(/零+/g, '零');    

    //将【零亿】换成【亿】【零万】换成【万】    
    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');    

    //将【亿万】换成【亿】    
    result = result.replace(/亿万/g, '亿');    

    //移除末尾的零    
    result = result.replace(/零+$/, '')    

    //将【零一十】换成【零十】    
    //result = result.replace(/零一十/g, '零十');
    //貌似正规读法是零一十    
    //将【一十】换成【十】    
    result = result.replace(/^一十/g, '十');    

    return result;
}

export const getAssetsFile = (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href
}

// 王者游戏内安全区兼容，横屏空出页面左右的位置
export const wzryIngameAdapt = () => {
    if (navigator.userAgent.indexOf('TIEM Ingame Browser/') !== -1) {
        let dom: HTMLElement = document.querySelector('.m-wrap');
        dom.style.width = '100%';
        dom.style.height = '100%';

        let dom2: HTMLElement = document.querySelector('.m-horizontal');
        dom2.style.width = '100%';
        dom2.style.height = '100%';
    } 
}

export const orientation = () => {
    let orientation = ''
    if (window.orientation === 180 || window.orientation === 0) {
      orientation = 'vertical'
    }
    if (window.orientation === 90 || window.orientation === -90) {
      orientation = 'horizontal'
    }
    return orientation
}

export const domIsVisible = (ele, cb?) => {
// 检测元素是否在可视范围内
const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            cb && cb();
        // `entry.target` is the dom element
        console.log(`${entry.target.id} is visible`);
      }
    });
};
  
  const options = {
    threshold: 1.0,
  };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ele);
}
