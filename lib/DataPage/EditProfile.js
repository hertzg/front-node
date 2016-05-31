var http = require('http'),
    querystring = require('querystring')

var Error500Page = require('../Error500Page.js'),
    Log = require('../Log.js')

var sessionNode = require('../../config.js').sessionNode

module.exports = (req, res, parsedUrl) => {

    function errorListener (err) {
        Log.error('session-node-client: editProfile: ' + JSON.stringify(err))
        Error500Page(res)
    }

    var proxyReq = http.request({
        host: sessionNode.host,
        port: sessionNode.port,
        path: '/editProfile?' + querystring.stringify(parsedUrl.query),
    }, proxyRes => {

        proxyReq.removeListener('error', errorListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            Log.error('session-node-client: editProfile: HTTP status code ' + statusCode)
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
