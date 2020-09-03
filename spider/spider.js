const phantom = require('phantom')
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
function delay(second) {
    return new Promise((resolve) => {
        setTimeout(resolve, second * 1000);
    });
}
let url = 'http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=%CF%C4%C4%BF%D3%D1%C8%CB%D5%CA%B1%DA%D6%BD1080&fr=ala&ala=1&alatpl=adress&pos=0&hs=2&xthttps=000000'
function save(url) {
    let ext = url.split('.').pop()
    request(url).pipe(fs.createWriteStream(`./img/${new Date().getTime()}.${ext}`));
}
(async function() {
    let instance = await phantom.create();
    let page = await instance.createPage();
    let status = await page.open(url);
    let size = await page.property('viewportSize', {
        width: 1920,
        height: 1080
    })
    let $
    async function pageScroll(i) {
        await delay(1)
        await page.property('scrollPosition', {
            left: 0,
            top: 1000 * i
        })
        let content = await page.property('content')
        $ = cheerio.load(content)
        if($('.imgbox').length < 200) {
            await pageScroll(++i)
        }
    }
    await pageScroll(0)
    let urlList = []
    $('.imgbox').each(function() {
        urlList.push('https://image.baidu.com'+$(this).find('a').attr('href'))
    })
    async function imgSave(i) {
        let status = await page.open(urlList[i])
        await delay(1)
        let content = await page.property('content')
        $ = cheerio.load(content)
        let src = $('#currentImg').attr('src')
        save(src)
        if(i<urlList.length) {
            await imgSave(++i)
        }
    }
    await imgSave(0)
    await instance.exit()
}());
