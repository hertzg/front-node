function WelcomePage_PasswordItem () {

    var classPrefix = 'WelcomePage_PasswordItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Password'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'password'
    input.className = classPrefix + '-input'

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)

    return { element: element }

}
