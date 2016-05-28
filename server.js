process.chdir(__dirname)

var http = require('http'),
    url = require('url')

var config = require('./config.js'),
    scanFiles = require('./lib/scanFiles.js'),
    Error404Page = require('./lib/Error404Page.js')

var pages = Object.create(null)
pages['/'] = require('./lib/IndexPage.js')
pages['/data/captcha'] = require('./lib/DataPage/Captcha.js')
scanFiles('files', pages)

http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url)
    var page = pages[parsedUrl.pathname]
    if (page === undefined) page = Error404Page
    page(req, res, parsedUrl)
}).listen(config.port, config.host)
