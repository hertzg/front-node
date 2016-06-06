function AccountPage_PhoneItem (getResourceUrl, profile, changeListener) {

    var classPrefix = 'AccountPage_PhoneItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Phone'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'text'
    input.className = classPrefix + '-input'
    input.value = profile.phone
    input.addEventListener('input', changeListener)

    var privacySelect = AccountPage_PrivacySelect(getResourceUrl,
        profile.phonePrivacy, changeListener)

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
