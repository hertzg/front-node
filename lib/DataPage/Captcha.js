var http = require('http')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var captchaNode = require('../../config.js').captchaNode

var host = captchaNode.host,
    port = captchaNode.port

var logPrefix = 'captcha-node-client: ' + host + ':' + port + ': frontNode/get: '

module.exports = (req, res) => {

    function closeListener () {
        proxyReq.removeListener('error', errorListener)
        proxyReq.on('error', () => {})
        proxyReq.abort()
    }

    function errorListener (err) {
        Log.error(logPrefix + err.code)
        Error500Page(res)
    }

    var proxyReq = http.request({
        host: host,
        port: port,
        path: '/frontNode/get',
    }, proxyRes => {

        proxyReq.removeListener('error', errorListener)
        req.removeListener('close', closeListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            Log.error(logPrefix + 'HTTP status code ' + statusCode)
            Error500Page(res)
            return
        }

        res.setHeader('Content-Type', 'application/json')
        proxyRes.pipe(res)

        req.on('close', () => {
            proxyReq.abort()
        })

    })
    proxyReq.end()
    proxyReq.on('error', errorListener)

    req.on('close', closeListener)

}
