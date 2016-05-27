function WorkPage_ChatPanel_SentMessage (text) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_SentMessage'
    element.appendChild(document.createTextNode(text))

    return { element: element }

}
