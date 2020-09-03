var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({
    secret: 'nienie',
    resave: false,
    saveUninitialized: true
}))

app.get('/set', function (req, resp, next) {
    req.session.a = 1
    req.session.b = 2
    req.session.c = 3
    resp.send('设置成功')
})

app.get('/get', function (req, resp, next) {
    console.log(req.session.a)
    console.log(req.session.b)
    console.log(req.session.c)
    resp.send('获取成功')
})

app.get('/del', function (req, resp, next) {
    req.session.c = null
    resp.send('删除成功')
})

app.listen(8088, function () {
    console.log('启动成功')
})