function WorkPage_ChatPanel_Messages () {

    var classPrefix = 'WorkPage_ChatPanel_Messages'

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'

    var typePanel = WorkPage_ChatPanel_TypePanel(function (text) {
        contentElement.appendChild(WorkPage_ChatPanel_SentMessage(text).element)
        contentElement.scrollTop = contentElement.scrollHeight
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    return {
        element: element,
        focus: typePanel.focus,
    }

}
