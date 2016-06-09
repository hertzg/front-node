var Revisions = require('./Revisions.js')

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
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
                '<link rel="stylesheet" type="text/css" href="css/BackButton.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/CloseButton.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/FormError.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/EmailItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/FullNameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/PhoneItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/PrivacySelect.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AccountPage/PrivacySelectItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AddContactPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/AddContactPage/UsernameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ChangePasswordPage/CurrentPasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ChangePasswordPage/NewPasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ChangePasswordPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ChangePasswordPage/RepeatNewPasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactPage/EmailItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactPage/FullNameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactPage/PhoneItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactRequestPage/Fields.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ContactRequestPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/CrashPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/PublicProfilePage/Fields.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/PublicProfilePage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/RemoveContactPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/ServiceErrorPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignOutPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/CaptchaItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/PasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/RepeatPasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/SignUpPage/UsernameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/PasswordItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/StaySignedInItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WelcomePage/UsernameItem.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/Page.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/ContactMenu.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/DaySeparator.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/Messages.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/Panel.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/ReceivedTextMessage.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/SendingTextMessage.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/SentTextMessage.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/Title.css" />' +
                '<link rel="stylesheet" type="text/css" href="css/WorkPage/ChatPanel/TypePanel.css" />' +
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
                '<script type="text/javascript" src="js/BackButton.js"></script>' +
                '<script type="text/javascript" src="js/CloseButton.js"></script>' +
                '<script type="text/javascript" src="js/ConnectionError.js"></script>' +
                '<script type="text/javascript" src="js/CrashError.js"></script>' +
                '<script type="text/javascript" src="js/IsChildElement.js"></script>' +
                '<script type="text/javascript" src="js/ServiceError.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/EmailItem.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/FullNameItem.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/PhoneItem.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/PrivacySelect.js"></script>' +
                '<script type="text/javascript" src="js/AccountPage/PrivacySelectItem.js"></script>' +
                '<script type="text/javascript" src="js/AddContactPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/AddContactPage/UsernameItem.js"></script>' +
                '<script type="text/javascript" src="js/ChangePasswordPage/CurrentPasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/ChangePasswordPage/NewPasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/ChangePasswordPage/RepeatNewPasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/ChangePasswordPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/ContactPage/EmailItem.js"></script>' +
                '<script type="text/javascript" src="js/ContactPage/FullNameItem.js"></script>' +
                '<script type="text/javascript" src="js/ContactPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/ContactPage/PhoneItem.js"></script>' +
                '<script type="text/javascript" src="js/ContactRequestPage/EmailItem.js"></script>' +
                '<script type="text/javascript" src="js/ContactRequestPage/Fields.js"></script>' +
                '<script type="text/javascript" src="js/ContactRequestPage/FullNameItem.js"></script>' +
                '<script type="text/javascript" src="js/ContactRequestPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/ContactRequestPage/PhoneItem.js"></script>' +
                '<script type="text/javascript" src="js/CrashPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/PublicProfilePage/EmailItem.js"></script>' +
                '<script type="text/javascript" src="js/PublicProfilePage/Fields.js"></script>' +
                '<script type="text/javascript" src="js/PublicProfilePage/FullNameItem.js"></script>' +
                '<script type="text/javascript" src="js/PublicProfilePage/Page.js"></script>' +
                '<script type="text/javascript" src="js/PublicProfilePage/PhoneItem.js"></script>' +
                '<script type="text/javascript" src="js/Password/init.js"></script>' +
                '<script type="text/javascript" src="js/Password/ContainsOnlyDigits.js"></script>' +
                '<script type="text/javascript" src="js/Password/IsShort.js"></script>' +
                '<script type="text/javascript" src="js/Password/IsValid.js"></script>' +
                '<script type="text/javascript" src="js/RemoveContactPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/ServiceErrorPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/SignOutPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/CaptchaItem.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/PasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/RepeatPasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/SignUpPage/UsernameItem.js"></script>' +
                '<script type="text/javascript" src="js/TwoDigitPad.js"></script>' +
                '<script type="text/javascript" src="js/Username/init.js"></script>' +
                '<script type="text/javascript" src="js/Username/ContainsIllegalChars.js"></script>' +
                '<script type="text/javascript" src="js/Username/IsShort.js"></script>' +
                '<script type="text/javascript" src="js/Username/IsValid.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/Page.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/PasswordItem.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/StaySignedInItem.js"></script>' +
                '<script type="text/javascript" src="js/WelcomePage/UsernameItem.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ContactRequests.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/Page.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/PullMessages.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/ContactMenu.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/DaySeparator.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/Messages.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/Panel.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/ReceivedTextMessage.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/RestoreMessages.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/SendingTextMessage.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/SentTextMessage.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/Title.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/ChatPanel/TypePanel.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/AccountMenu.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Contact.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/ContactList.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Panel.js"></script>' +
                '<script type="text/javascript" src="js/WorkPage/SidePanel/Title.js"></script>' +
                '<script type="text/javascript" src="js/CheckSession.js"></script>' +
                '<script type="text/javascript" src="js/CollapseSpaces.js"></script>' +
                '<script type="text/javascript" src="js/Main.js"></script>' +
            '</body>' +
        '</html>'
    )
}
