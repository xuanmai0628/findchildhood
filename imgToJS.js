// 生成用于加载图片的config

const fs = require('fs');
const getImageSize = require('image-size');

const path = require('path');
function getAllDirs (mypath = './src/assets/') {

    const items = fs.readdirSync(mypath);

    let result = '';
    // 遍历当前目录中所有的文件和文件夹
    let strTemp = function (name) {
        // if (name.match(/.DS_Store)/)) {
        if (!name.match(/.png|.jpg|.jpeg/)) {
            return;
        } 
        const { width, height, type} = getImageSize(name);
        let name1 = name.replace(/\\/g, '/');
        let name2 = name1.replace(/src\/assets\//g, '');
        let name3 = name2.replace(/\.\w*/g, '').replace(/\w*\//g, '');
        result += `
{
    name: "${name3}",
    url: getAssetsFile('${name2}'),
    draw: false
},
        `;
    };
    items.map(item => {
        let temp = path.join(mypath, item);

        // 若当前的为文件夹
        if (!fs.statSync(temp).isDirectory()) {
            strTemp(temp); // 存储当前文件夹的名字
            // 进入下一级文件夹访问
        } else {
            result = result.concat(getAllDirs(temp));
        }
    });

    return result;
};
fs.writeFile(path.join(path.resolve(__dirname), './urls.json'), `` + getAllDirs(), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('File saved successfully!');
});
