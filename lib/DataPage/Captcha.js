var http = require('http')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var captchaNode = require('../../config.js').captchaNode

module.exports = (req, res) => {

    function errorListener (err) {
        Log.error(logPrefix + err.code)
        Error500Page(res)
    }

    var host = captchaNode.host,
        port = captchaNode.port

    var logPrefix = 'captcha-node-client: ' + host + ':' + port + ': get: '

    var proxyReq = http.request({
        host: captchaNode.host,
        port: captchaNode.port,
        path: '/get',
    }, proxyRes => {

        proxyReq.removeListener('error', errorListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            Log.error(logPrefix + 'HTTP status code ' + statusCode)
            Error500Page(res)
            return
        }

        proxyRes.pipe(res)

        req.on('close', () => {
            proxyReq.abort()
        })

    })
    proxyReq.end()
    proxyReq.on('error', errorListener)

}
