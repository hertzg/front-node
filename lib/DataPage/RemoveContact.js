var http = require('http'),
    querystring = require('querystring')

var Error500Page = require('../Error500Page.js')
var sessionNode = require('../../config.js').sessionNode

module.exports = (req, res, parsedUrl) => {

    function errorListener (err) {
        console.log('ERROR: session-node-client: removeContact: ' + JSON.stringify(err))
        Error500Page(res)
    }

    var proxyReq = http.request({
        host: sessionNode.host,
        port: sessionNode.port,
        path: '/removeContact?' + querystring.stringify(parsedUrl.query),
    }, proxyRes => {

        proxyReq.removeListener('error', errorListener)

        var statusCode = proxyRes.statusCode
        if (statusCode !== 200) {
            console.log('ERROR: session-node-client: removeContact: HTTP status code ' + statusCode)
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
