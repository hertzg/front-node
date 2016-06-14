function WorkPage_ChatPanel_ReceivedFileMessage (file, time) {

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
    element.appendChild(document.createTextNode(file.name + ' - ' + file.size))

    return {
        element: element,
        add: function (file) {
            element.appendChild(document.createElement('br'))
            element.appendChild(document.createTextNode(file.name + ' - ' + file.size))
        },
    }

}
