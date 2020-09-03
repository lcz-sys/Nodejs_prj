var http = require('http');
var server = http.createServer();
server.on('request', function (req, resp) {


    if (req.url == '/') {
        $msg = 'this is index';
    } else if (req.url == '/login') {
        $msg = 'this is login';
    } else {
        $msg = '404';
    }

    resp.setHeader('Content-type', 'text/html;charset=utf8');
    resp.write($msg);
    resp.end();
});
server.listen(8088, function () {
    console.log('服务器启动成功');
});