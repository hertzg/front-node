module.exports = (req, res) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8')
    res.end(
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                '<title>Bazgu &middot; The Free Web Messenger</title>' +
                '<meta name="viewport" content="width=device-width, user-scalable=no" />' +
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                '<link rel="icon" type="image/png" href="img/icon/16.png" />' +
                '<link rel="stylesheet" type="text/css" href="css/Main.css" />' +
            '</head>' +
            '<body>' +
                '<script type="text/javascript" src="js/Main.js"></script>' +
            '</body>' +
        '</html>'
    )
}
