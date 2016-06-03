var http = require('http')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var captchaNode = require('../../config.js').captchaNode

module.exports = (req, res) => {

    function errorListener (err) {
        Log.error('captcha-node-client: get: ' + JSON.stringify(err))
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
            Log.error('captcha-node-client: get: HTTP status code ' + statusCode)
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
