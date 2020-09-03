//引入http,fs,path,url,queryString模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var queryString = require('querystring');

//创建留言数据对象
var msgs = [{
        name: '张三',
        content: '你好我是张三',
        create_at: '2020-1-1 11:21'
    },
    {
        name: '李四',
        content: '你好我是李四',
        create_at: '2020-1-1 11:19'
    },
    {
        name: '王五',
        content: '你好我是王五',
        create_at: '2020-1-1 11:17'
    }
];

//创建web服务器
http.createServer(function (req, resp) {
    //获取当前请求地址
    var currentUrl = req.url;

    if (currentUrl == '/' || currentUrl == '/index') {
        fs.readFile(path.join(__dirname, 'view', 'index.html'), function (err, data) {
            if (err) {
                throw err;
            }

            var html = '';
            msgs.forEach(function (item) {
                html += `<li class="list-group-item">${item.name}说：${item.content}<span
                    class="pull-right">${item.create_at}</span></li>`
            });

            var data = data.toString().replace('^_^', html);

            resp.end(data);
        });
    } else if (currentUrl == '/post') {
        fs.readFile(path.join(__dirname, 'view', 'post.html'), function (err, data) {
            if (err) {
                throw err;
            }
            resp.end(data);
        });
    } else if (currentUrl.indexOf('/public') === 0) {
        fs.readFile('./' + currentUrl, function (err, data) {
            if (err) {
                throw err;
            }
            resp.end(data);
        });
    } else if (currentUrl.indexOf('/doPost') == 0) {
        if (req.method == 'POST') {
            var postData = '';
            req.on('data', function (chunk) {
                postData += chunk;
            });
            req.on('end', function () {
                paramObj = queryString.parse(postData);
                var d = new Date();
                var month = d.getMonth() * 1 + 1;
                var date = d.getFullYear() + '-' + month + '-' + d.getDate() + ' ' +
                    d.getHours() + ':' + d.getMinutes();
                var msg = {
                    name: paramObj.name,
                    content: paramObj.content,
                    create_at: date
                };
                msgs.push(msg);
                //跳转
                resp.statusCode = 302;
                resp.setHeader('Location', '/');
                resp.end();
            });
        } else {
            var paramObj = url.parse(currentUrl, true).query;
            var d = new Date();
            var month = d.getMonth() * 1 + 1;
            var date = d.getFullYear() + '-' + month + '-' + d.getDate() + ' ' +
                d.getHours() + ':' + d.getMinutes();
            var msg = {
                name: paramObj.name,
                content: paramObj.content,
                create_at: date
            };
            msgs.push(msg);
            //跳转
            resp.statusCode = 302;
            resp.setHeader('Location', '/');
            resp.end();
        }
    } else {
        fs.readFile(path.join(__dirname, 'view', '404.html'), function (err, data) {
            if (err) {
                throw err;
            }
            resp.end(data);
        });
    }

}).listen(8088, function () {
    console.log('服务器启动成功');
})