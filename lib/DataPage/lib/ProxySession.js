var http = require('http'),
    querystring = require('querystring')

var Error500Page = require('../../Error500Page.js'),
    Log = require('../../Log.js')

var sessionNode = require('../../../config.js').sessionNode

module.exports = method => {
    method = 'frontNode/' + method
    return (req, res, parsedUrl) => {

        res.setHeader('Content-Type', 'application/json')

        if (parsedUrl.query.token === undefined) {
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

            var host = sessionNode.host,
                port = sessionNode.port

            var logPrefix = 'session-node-client: ' + host + ':' + port + ': ' + method + ': '

            var proxyReq = http.request({
                host: host,
                port: port,
                path: '/' + method + '?' + querystring.stringify(parsedUrl.query),
            }, proxyRes => {

                proxyReq.removeListener('error', errorListener)
                req.removeListener('close', closeListener)

                var statusCode = proxyRes.statusCode
                if (statusCode !== 200) {
                    Log.error(logPrefix + 'HTTP status code ' + statusCode)
                    Error500Page(res)
                    return
                }

                proxyRes.pipe(res)

            })
            proxyReq.end()
            proxyReq.on('error', errorListener)

            req.on('close', closeListener)

        })()

    }
}
