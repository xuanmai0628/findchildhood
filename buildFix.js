// 适配腾讯ihub系统的打包格式调整

const fs = require('fs');
const path = require('path');

let distPath = './dist/';
let imgPath = 'https://game.gtimg.cn/images/yxzj/cp/a20221226wzmcm/';
let jsPath = 'https://game.gtimg.cn/images/yxzj/cp/a20221226wzmcm/';
const items = fs.readdirSync(distPath);

fs.mkdirSync(path.join(distPath, 'webp-img'))

items.map(item => {
    let temp = path.join(distPath, item);

    if (item === 'index.html') {
        let str = fs.readFileSync(temp).toString();
        str = str.replace(/\/ossweb-img\//g, jsPath);

        fs.writeFileSync(temp, str)
    } else 

    if (item === 'ossweb-img') {
        fs.readdir(temp, (err, status) => {
            if (err) throw err

            status.map(file => {
                if (file.match(/(.css|.js)/)) {
                    console.log(file);
                    let filePath = distPath + 'ossweb-img/' + file;
                    let str = fs.readFileSync(filePath).toString();

                    str = str.replace(/\/ossweb-img\//g, imgPath);
                    str = str.replace(/\/spine\//g, jsPath);
                    str = str.replace(/"\/","spine\//g, `"${jsPath}", "`);

                    fs.writeFileSync(filePath, str)
                } else if (file.includes('.png') || file.includes('.jpg') || file.includes('.jpeg')) {
                    let filePath = distPath + 'ossweb-img/' + file;
                    let newPath = distPath + 'webp-img/' + file;
                    fs.copyFileSync(filePath, newPath)
                }
            })
        })
    } else 

    if (item === 'spine') {
        let status = fs.readdirSync(temp)

        status.map(file => {
            let filePath = distPath + 'spine/' + file;
            let newPath = distPath + 'ossweb-img/' + file;

            fs.renameSync(filePath, newPath)
        })   

        fs.rmdirSync(temp)
    } else

    if (item.includes('.ttf')) {
        let newPath = distPath + 'ossweb-img/' + item;

        fs.renameSync(temp, newPath);
    }

    if (item === 'share.jpg') {
        let newPath = distPath + 'ossweb-img/' + item;

        fs.renameSync(temp, newPath);
    }
});