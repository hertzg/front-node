var fs = require('fs'),
    path = require('path')

module.exports = (root, pages) => {

    function scan (dir) {
        fs.readdirSync(root + dir).forEach(file => {
            var filepath = dir + '/' + file
            var stat = fs.statSync(root + filepath)
            if (stat.isDirectory()) scan(filepath)
            else {

                var extension = path.extname(file)

                var contentType
                if (extension === '.css') {
                    contentType = 'text/css'
                } else if (extension === '.js') {
                    contentType = 'application/javascript'
                } else if (extension === '.png') {
                    contentType = 'image/png'
                } else if (extension === '.svg') {
                    contentType = 'image/svg+xml'
                }
                else return

                var content = fs.readFileSync(root + filepath)

                pages[filepath] = (req, res) => {
                    res.setHeader('Content-Type', contentType)
                    res.end(content)
                }

            }
        })
    }

    scan('')

}
