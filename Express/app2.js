var express = require('express');

var app = express();

app.engine('html', require('express-art-template'));

app.get('/', function (req, resp) {
    resp.render('test.html', {
        username: '连捏捏',
        age: 5,
        orders: [{
                id: 1,
                title: '标题1',
                price: 30
            },
            {
                id: 2,
                title: '标题2',
                price: 33
            },
            {
                id: 3,
                title: '标题3',
                price: 12
            }
        ]
    });
}).listen(8808, function () {
    console.log('服务器启动成功');
});