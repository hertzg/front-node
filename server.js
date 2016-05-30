process.chdir(__dirname)

var http = require('http'),
    url = require('url')

var config = require('./config.js'),
    scanFiles = require('./lib/scanFiles.js'),
    Error404Page = require('./lib/Error404Page.js')

var pages = Object.create(null)
pages['/'] = require('./lib/IndexPage.js')
pages['/data/addContact'] = require('./lib/DataPage/AddContact.js')
pages['/data/captcha'] = require('./lib/DataPage/Captcha.js')
pages['/data/changePassword'] = require('./lib/DataPage/ChangePassword.js')
pages['/data/editContact'] = require('./lib/DataPage/EditContact.js')
pages['/data/editProfile'] = require('./lib/DataPage/EditProfile.js')
pages['/data/publicProfile'] = require('./lib/DataPage/PublicProfile.js')
pages['/data/removeContact'] = require('./lib/DataPage/RemoveContact.js')
pages['/data/signIn'] = require('./lib/DataPage/SignIn.js')
pages['/data/signOut'] = require('./lib/DataPage/SignOut.js')
pages['/data/signUp'] = require('./lib/DataPage/SignUp.js')
scanFiles('files', pages)

http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true)
    var page = pages[parsedUrl.pathname]
    if (page === undefined) page = Error404Page
    page(req, res, parsedUrl)
}).listen(config.port, config.host)
