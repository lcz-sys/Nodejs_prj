var express = require('express');

var app = express();

app.get('/', function (req, resp) {
    resp.send('连捏捏');
}).listen(8000, function () {
    console.log('服务器启动成功');
});