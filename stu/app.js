//引入模块
var express = require('express');
var bodyParser = require('body-parser');

//创建APP对象
var app = express();

//配置框架
app.engine('html', require('express-art-template'));
app.use('/node_modules', express.static('/node_modules'));
app.use('/public', express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//路由
var stuRouter = require('./routers/stu');
app.use('/stu', stuRouter);

//启动服务
app.listen(8088, function () {
    console.log('服务器启动成功');
});