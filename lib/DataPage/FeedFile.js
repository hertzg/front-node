var http = require('http')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var fileNode = require('../../config.js').fileNode

var host = fileNode.host,
    port = fileNode.port

var logPrefix = 'file-node-client: ' + host + ':' + port + ': frontNode/feed: '

module.exports = (req, res, parsedUrl) => {

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
        path: '/frontNode/feed?token=' + encodeURIComponent(parsedUrl.query.token),
        method: 'post',
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
    req.pipe(proxyReq)
    proxyReq.on('error', errorListener)

    req.on('close', closeListener)

}
