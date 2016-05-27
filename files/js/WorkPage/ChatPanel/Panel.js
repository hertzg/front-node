function WorkPage_ChatPanel_Panel (data, profileListener, removeListener) {

    var title = WorkPage_ChatPanel_Title(data, profileListener, removeListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_Panel'
    element.appendChild(title.element)

    return { element: element }

}
