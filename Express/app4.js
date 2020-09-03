var express = require('express');

var app = express();

app.get('/stu/:name/:age', function (req, resp) {
    console.log(req.params);
    resp.send('匹配成功');
});

app.listen(8808, function () {
    console.log('服务器启动成功');
});