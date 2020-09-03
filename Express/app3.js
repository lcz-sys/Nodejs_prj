var express = require('express');

var app = express();

app.get('/', function (req, resp) {
    var formHtml = `
    <form action="/test" method="GET">
        <input type="text" name="uname"/>
        <input type="text" name="age"/>
        <input type="submit"/>
    </form>
    `
    resp.send(formHtml);
});

app.get('/test', function (req, resp) {
    resp.send('this is get submit');
});

app.post('/test', function (req, resp) {
    resp.send('this is post submit');
});

app.listen(8808, function () {
    console.log('服务器启动成功');
});