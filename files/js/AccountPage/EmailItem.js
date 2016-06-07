function AccountPage_EmailItem (getResourceUrl,
    profile, changeListener, closeListener) {

    var classPrefix = 'AccountPage_EmailItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Email'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'text'
    input.className = classPrefix + '-input'
    input.value = profile.email
    input.addEventListener('input', changeListener)
    input.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })

    var privacySelect = AccountPage_PrivacySelect(getResourceUrl,
        profile.emailPrivacy, changeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)
    element.appendChild(privacySelect.element)

    return {
        element: element,
        getPrivacyValue: privacySelect.getValue,
        disable: function () {
            input.disabled = true
            input.blur()
        },
        enable: function () {
            input.disabled = false
        },
        getValue: function () {
            return CollapseSpaces(input.value)
        },
    }

}
