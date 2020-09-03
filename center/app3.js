var express = require('express')
var cookie = require('cookie-parser')

var app = express()

app.use(cookie('nienie'))

app.get('/set', function (req, resp, next) {
    resp.cookie('a', 1)
    resp.cookie('b', 2, {
        maxAge: 60 * 1000
    })
    resp.cookie('c', 3, {
        signed: true
    })
    resp.cookie('d', 4)
    resp.send('设置成功')
})

app.get('/get', function (req, resp, next) {
    console.log(req.cookies.a)
    console.log(req.cookies.b)
    console.log(req.cookies.c)
    console.log(req.cookies.d)
    console.log(req.signedCookies.c)
    resp.send('获取成功')
})

app.get('/del', function (req, resp, next) {
    resp.clearCookie('d')
    resp.send('删除成功')
})

app.listen(8088, function () {
    console.log('启动成功')
})