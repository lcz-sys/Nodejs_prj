var http = require('http');
var server = http.createServer();
server.on('request', function (req, resp) {

    // console.log(req.headers);
    // console.log(req.rawHeaders);
    // console.log(req.httpVersion);
    // console.log(req.method);
    // console.log(req.url);

    // resp.statusCode = 404;
    // resp.statusMessage = 'Not Found';

    // resp.setHeader('Content-type', 'text/html;charset=utf8');

    resp.writeHeader(404, 'Not Found', {
        'Content-type': 'text/html;charset=utf8'
    });
    resp.write('打印request对象');
    resp.end();
});
server.listen(8088, function () {
    console.log('服务器启动成功');
});