//加载http模块
var http = require('http');

//加载fs模块
var fs = require('fs');

//加载path模块
var path = require('path');

//创建web服务器
http.createServer(function (req, resp) {

    if (req.url == '/' || req.url == '/index') {
        fs.readFile(path.join(__dirname, 'htmls', 'index.html'), function (err, data) {
            if (err) {
                throw err;
            }

            resp.end(data);
        });
    } else if (req.url == '/login') {
        fs.readFile(path.join(__dirname, 'htmls', 'login.html'), function (err, data) {
            if (err) {
                throw err;
            }

            resp.end(data);
        });
    } else if (req.url == '/list') {
        fs.readFile(path.join(__dirname, 'htmls', 'list.html'), function (err, data) {
            if (err) {
                throw err;
            }

            resp.end(data);
        });
    } else if (req.url == '/register') {
        fs.readFile(path.join(__dirname, 'htmls', 'register.html'), function (err, data) {
            if (err) {
                throw err;
            }

            resp.end(data);
        });
    } else {
        fs.readFile(path.join(__dirname, 'htmls', '404.html'), function (err, data) {
            if (err) {
                throw err;
            }

            resp.end(data);
        });
    }

}).listen(8088, function () {
    console.log('服务器启动成功');
});