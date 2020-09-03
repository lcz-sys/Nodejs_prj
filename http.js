//引入模块
var http = require('http');
//创建web服务器
var server = http.createServer();
//监听请求
server.on('request', function (req, resp) {
    console.log('收到用户请求' + req.url);
    resp.write('hello');
    resp.end();
});
//启动服务
server.listen(8088, function () {
    console.log('服务启动成功那个，访问http://localhost:8088');
});