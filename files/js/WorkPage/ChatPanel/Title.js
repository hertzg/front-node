function WorkPage_ChatPanel_Title (username,
    profile, overrideProfile, profileListener, removeListener) {

    function createButtonText () {
        return overrideProfile.fullName || profile.fullName || username
    }

    function deselect () {
        buttonClassList.remove('selected')
        button.removeEventListener('click', deselect)
        button.addEventListener('click', select)
        element.removeChild(contactMenu.element)
        removeEventListener('mousedown', windowMouseDown)
    }

    function select () {
        buttonClassList.add('selected')
        button.removeEventListener('click', select)
        button.addEventListener('click', deselect)
        element.appendChild(contactMenu.element)
        addEventListener('mousedown', windowMouseDown)
    }

    function windowMouseDown (e) {
        if (e.button !== 0) return
        if (IsChildElement(element, e.target)) return
        deselect()
    }

    var classPrefix = 'WorkPage_ChatPanel_Title'

    var contactMenu = WorkPage_ChatPanel_ContactMenu(function () {
        deselect()
        profileListener()
    }, function () {
        deselect()
        removeListener()
    })

    var buttonTextNode = document.createTextNode(createButtonText())

    var buttonTextElement = document.createElement('span')
    buttonTextElement.className = classPrefix + '-buttonText'
    buttonTextElement.appendChild(buttonTextNode)

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonTextElement)
    button.appendChild(document.createTextNode(' \u25be'))
    button.addEventListener('click', select)

    var buttonClassList = button.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(button)

    return {
        element: element,
        editContactProfile: function (_profile) {
            profile = _profile
            buttonTextNode.nodeValue = createButtonText()
        },
        overrideContactProfile: function (_overrideProfile) {
            overrideProfile = _overrideProfile
            buttonTextNode.nodeValue = createButtonText()
        },
    }

}
