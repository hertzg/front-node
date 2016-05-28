function AccountPage_FullNameItem () {

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

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)

    return { element: element }

}