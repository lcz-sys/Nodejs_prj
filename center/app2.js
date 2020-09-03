var express = require('express')
var fs = require('fs')

var app = express()

app.use('/', function (req, resp, next) {
    console.log(1)
    next()
})

app.use('/', function (req, resp, next) {
    console.log(2)
    next()
})

app.get('/stu', function (req, resp, next) {
    fs.readFile('./a.txt', function (err, data) {
        if (err) next(err)
        resp.send(data)
    })
})

app.get('/stu/create', function (req, resp) {
    fs.readFile('./b.txt', function (err, data) {
        if (err) next(err)
        resp.send(data)
    })
})

app.use('/', function (req, resp) {
    resp.send('404 Page')
})

app.use('/', function (err, req, resp, next) {
    resp.send('ERROR')
})

app.listen(8088, function () {
    console.log('启动成功')
})