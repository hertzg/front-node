var http = require('http'),
    querystring = require('querystring')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var accountNode = require('../../config.js').accountNode

module.exports = (req, res, parsedUrl) => {

    function errorListener (err) {
        Log.error('account-node-client: signUp: ' + JSON.stringify(err))
        Error500Page(res)
    }

    var proxyReq = http.request({
        host: accountNode.host,
        port: accountNode.port,
        path: '/signUp?' + querystring.stringify(parsedUrl.query),
    }, proxyRes => {

        proxyReq.removeListener('error', errorListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            Log.error('account-node-client: signUp: HTTP status code ' + statusCode)
            Error500Page(res)
            return
        }

        var responseText = ''
        proxyRes.setEncoding('utf8')
        proxyRes.on('data', chunk => {
            responseText += chunk
        })
        proxyRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json')
            res.end(responseText)
        })

    })
    proxyReq.end()
    proxyReq.on('error', errorListener)

}
