function AccountPage_FullNameItem (getResourceUrl, profile, closeListener) {

    var classPrefix = 'AccountPage_FullNameItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Full name'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'text'
    input.className = classPrefix + '-input'
    input.value = profile.fullName
    input.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })

    var privacySelect = AccountPage_PrivacySelect(getResourceUrl, profile.fullNamePrivacy)

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
        focus: function () {
            input.focus()
        },
        getValue: function () {
            return CollapseSpaces(input.value)
        },
    }

}
