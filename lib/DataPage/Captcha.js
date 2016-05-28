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

        proxyReq.removeListener('error', errorListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            console.log('ERROR: captcha-node-client: HTTP status code ' + statusCode)
            Error500Page(res)
            return
        }

        var data = ''
        proxyRes.setEncoding('utf8')
        proxyRes.on('data', chunk => {
            data += chunk
        })
        proxyRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
        })

    })
    proxyReq.end()
    proxyReq.on('error', errorListener)

}
