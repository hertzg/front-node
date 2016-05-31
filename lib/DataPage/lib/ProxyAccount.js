var http = require('http'),
    querystring = require('querystring')

var Error500Page = require('../../Error500Page.js'),
    Log = require('../../Log.js')

var accountNode = require('../../../config.js').accountNode

module.exports = method => {
    return (req, res, parsedUrl) => {

        res.setHeader('Content-Type', 'application/json')

        if (parsedUrl.query.username === undefined) {
            res.end('"INVALID_USERNAME"')
            return
        }

        ;(() => {

            function errorListener (err) {
                Log.error('account-node-client: ' + method + ': ' + JSON.stringify(err))
                Error500Page(res)
            }

            var proxyReq = http.request({
                host: accountNode.host,
                port: accountNode.port,
                path: '/' + method + '?' + querystring.stringify(parsedUrl.query),
            }, proxyRes => {

                proxyReq.removeListener('error', errorListener)

                var statusCode = proxyRes.statusCode
                if (statusCode !== 200) {
                    Log.error('account-node-client: ' + method + ': HTTP status code ' + statusCode)
                    Error500Page(res)
                    return
                }

                proxyRes.pipe(res)

            })
            proxyReq.end()
            proxyReq.on('error', errorListener)

        })()

    }
}
