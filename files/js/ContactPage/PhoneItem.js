function ContactPage_PhoneItem (profile, overrideProfile, changeListener) {

    var classPrefix = 'ContactPage_PhoneItem'

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
    input.placeholder = profile.phone
    input.value = overrideProfile.phone
    input.addEventListener('input', changeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)

    return {
        element: element,
        disable: function () {
            input.disabled = true
            input.blur()
        },
        editProfile: function (profile) {
            input.placeholder = profile.phone
        },
        enable: function () {
            input.disabled = false
        },
        getValue: function () {
            return CollapseSpaces(input.value)
        },
    }

}
