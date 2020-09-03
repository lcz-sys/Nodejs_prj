var express = require('express')

var app = express()

app.use('/', function (req, resp, next) {
    console.log(1)
    next()
})
app.use('/', function (req, resp, next) {
    console.log(2)
})
app.get('/stu', function (req, resp) {
    console.log('stu list')
    resp.send('stu list')
})

app.listen(8088, function () {
    console.log('启动成功')
})