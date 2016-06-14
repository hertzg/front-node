var http = require('http')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var fileNode = require('../../config.js').fileNode

module.exports = (req, res, parsedUrl) => {

    var token = parsedUrl.query.token
    if (token === undefined) {
        res.setHeader('Content-Type', 'application/json')
        res.end('"INVALID_TOKEN"')
        return
    }

    ;(() => {
        function closeListener () {
            proxyReq.removeListener('error', errorListener)
            proxyReq.on('error', () => {})
            proxyReq.abort()
        }

        function errorListener (err) {
            Log.error(logPrefix + err.code)
            Error500Page(res)
        }

        var host = fileNode.host,
            port = fileNode.port

        var logPrefix = 'file-node-client: ' + host + ':' + port + ': frontNode/receive: '

        var proxyReq = http.request({
            host: host,
            port: port,
            path: '/frontNode/receive?token=' + encodeURIComponent(token),
        }, proxyRes => {

            proxyReq.removeListener('error', errorListener)
            req.removeListener('close', closeListener)

            var statusCode = proxyRes.statusCode
            if (statusCode !== 200) {
                Log.error(logPrefix + 'HTTP status code ' + statusCode)
                Error500Page(res)
                return
            }

            res.setHeader('Content-Type', proxyRes.headers['content-type'])
            proxyRes.pipe(res)

            req.on('close', () => {
                proxyReq.abort()
            })

        })
        proxyReq.end()
        proxyReq.on('error', errorListener)

        req.on('close', closeListener)

    })()

}
