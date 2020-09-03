const http = require('http')

http.get('http://bbs.itheima.com/forum-401-1.html',function(req,resp){
    var html = ''
    req.on('data',function(data){
        html += data
    })

    req.on('end',function(){
        getTittle(html)
    })
})

function getTittle(html){
    const cheerio = require('cheerio')
    const $ = cheerio.load(html, {decodeEntities: false})
    $('.xst').each(function(index,item){
        console.log($(item).html())
    })
}