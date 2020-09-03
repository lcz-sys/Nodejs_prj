//引入mime模块
var mime = require('mime');

var img = 'xxx.png';
console.log(mime.getType(img));
console.log(mime.getExtension('image/png'));