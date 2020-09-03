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

var express = require('express');
var url = require('url');
var moment = require('moment');
var queryString = require('querystring');

var app = express();

app.engine('html', require('express-art-template'));
app.use('/public', express.static('/public'));

app.get('/', function (req, resp) {
    resp.render('index.html', {
        msgs: msgs
    });
});

app.get('/post', function (req, resp) {
    resp.render('post.html');
});

app.post('/doPost', function (req, resp) {
    if (req.method == 'POST') {
        var postData = '';
        req.on('data', function (chunk) {
            postData += chunk;
        });
        req.on('end', function () {
            paramObj = queryString.parse(postData);
            var date = moment().format('YYYY-M-D hh:mm');

            var msg = {
                name: paramObj.name,
                content: paramObj.content,
                create_at: date
            }

            msgs.push(msg);

            resp.redirect('/');

            resp.end();
        });
    } else {
        var paramObj = url.parse(req.url, true).query;

        // var d = new Date();
        // var month = d.getMonth * 1 + 1;
        // var date = d.getFullYear + '-' + month + '-' + d.getDate + ' ' + d.getHours + ':' + d.getMinutes;
        var date = moment().format('YYYY-M-D hh:mm');

        var msg = {
            name: paramObj.name,
            content: paramObj.content,
            create_at: date
        }

        msgs.push(msg);

        resp.redirect('/');
    }
});

app.listen(8808, function () {
    console.log('服务器启动成功');
});