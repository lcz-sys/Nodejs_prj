var art = require('art-template');

var html = '<h1>{{username}}</h1>';
var result = art.render(html, {
    username: '连捏捏'
});
console.log(result);