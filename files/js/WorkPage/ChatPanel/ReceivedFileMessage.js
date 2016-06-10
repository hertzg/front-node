function WorkPage_ChatPanel_ReceivedFileMessage (name, size, time) {

    var classPrefix = 'WorkPage_ChatPanel_ReceivedFileMessage'

    var date = new Date(time)

    var timeString = TwoDigitPad(date.getUTCHours()) +
        ':' + TwoDigitPad(date.getUTCMinutes())

    var timeElement = document.createElement('div')
    timeElement.className = classPrefix + '-time'
    timeElement.appendChild(document.createTextNode(timeString))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(timeElement)
    element.appendChild(document.createTextNode(name + ' - ' + size))

    return {
        element: element,
        add: function (name, size) {
            element.appendChild(document.createElement('br'))
            element.appendChild(document.createTextNode(name + ' - ' + size))
        },
    }

}
