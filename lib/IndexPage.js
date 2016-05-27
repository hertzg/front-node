var Revisions = require('./Revisions.js')

module.exports = (req, res) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8')
    res.end(
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                '<title>Bazgu &middot; The Free Web Messenger</title>' +
                '<meta name="viewport" content="width=device-width, user-scalable=no" />' +
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                '<link rel="icon" type="image/png" href="img/icon/16.png" sizes="16x16" />' +
                '<link rel="icon" type="image/png" href="img/icon/32.png" sizes="32x32" />' +
                '<link rel="icon" type="image/png" href="img/icon/64.png" sizes="64x64" />' +
                '<link rel="icon" type="image/png" href="img/icon/128.png" sizes="128x128" />' +
                '<link rel="icon" type="image/png" href="img/icon/256.png" sizes="256x256" />' +
                '<link rel="icon" type="image/png" href="img/icon/512.png" sizes="512x512" />' +
                '<link rel="stylesheet" type="text/css" href="css/Main.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/PasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/RepeatPasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/UsernameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/PasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/StaySignedInItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/UsernameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/SidePanel/AccountMenu.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/SidePanel/Contact.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/SidePanel/ContactList.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/SidePanel/Panel.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/SidePanel/Title.css" />' +
            '</head>' +
            '<body>' +
                '<script type="text/javascript">' +
                    'var revisions = ' + JSON.stringify(Revisions()) +
                '</script>' +
                '<script type="text/javascript" src="js/SignUpPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/PasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/RepeatPasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/UsernameItem.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/Page.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/PasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/StaySignedInItem.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/UsernameItem.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/AccountMenu.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Contact.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/ContactList.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Panel.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Title.js"></script>' +
                '<script type="text/javascript" src="js/Main.js"></script>' +
            '</body>' +
        '</html>'
    )
}
