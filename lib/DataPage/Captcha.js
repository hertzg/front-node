var http = require('http')

var config = require('../../config.js'),
    Error500Page = require('../Error500Page.js')

var captchaNode = config.captchaNode

module.exports = (req, res) => {

    function errorListener (err) {
        console.log('ERROR: captcha-node-client: ' + JSON.stringify(err))
        Error500Page(res)
    }

    var proxyReq = http.request({
        host: captchaNode.host,
        port: captchaNode.port,
        path: '/get',
    }, proxyRes => {
        var statusCode = proxyRes.statusCode
        if (statusCode === 200) {
            var data = ''
            proxyRes.setEncoding('utf8')
            proxyRes.on('data', chunk => {
                data += chunk
            })
            proxyRes.on('end', () => {
                res.setHeader('content-type', 'application/json')
                res.end(data)
            })
        } else {
            console.log('ERROR: captcha-node-client: HTTP status code ' + statusCode)
        }
    })
    proxyReq.end()
    proxyReq.on('error', errorListener)

}
