var express = require('express');
var fs = require('fs');

var app = express();

app.use('/css', function (req, resp) {
    fs.readFile('./css/' + req.url, 'utf8', function (err, data) {
        if (err) {
            resp.send(err);
        }
        resp.send(data);
    });
});

app.listen(8808, function () {
    console.log('服务器启动成功');
});