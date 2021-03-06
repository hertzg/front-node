function ContactPage_EmailItem (profile,
    overrideProfile, changeListener, closeListener) {

    var classPrefix = 'ContactPage_EmailItem'

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
    input.placeholder = profile.email
    input.value = overrideProfile.email
    input.addEventListener('input', changeListener)
    input.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })

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
            input.placeholder = profile.email
        },
        enable: function () {
            input.disabled = false
        },
        getValue: function () {
            return CollapseSpaces(input.value)
        },
    }

}
