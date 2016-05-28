module.exports = (req, res) => {
    res.statusCode = 500
    res.setHeader('content-type', 'text/plain')
    res.end('500 Internal Server Error')
}
