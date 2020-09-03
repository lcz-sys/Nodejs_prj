const url='www.image.baidu.com';//填写自己请求的具体的网址

const path=require('path');
const imgDir=path.join(__dirname,'img');

module.exports.url=url;
module.exports.imgDir=imgDir;