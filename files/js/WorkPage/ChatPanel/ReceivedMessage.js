function WorkPage_ChatPanel_ReceivedMessage (text) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_ReceivedMessage'
    element.appendChild(document.createTextNode(text))

    var classList = element.classList

    return { element: element }

}
