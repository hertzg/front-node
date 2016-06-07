function WorkPage_ChatPanel_ReceivedTextMessage (text, time) {

    var classPrefix = 'WorkPage_ChatPanel_ReceivedTextMessage'

    var date = new Date(time)

    var timeString = TwoDigitPad(date.getUTCHours() + ':' + date.getUTCMinutes())

    var timeElement = document.createElement('div')
    timeElement.className = classPrefix + '-time'
    timeElement.appendChild(document.createTextNode(timeString))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(timeElement)
    element.appendChild(document.createTextNode(text))

    return { element: element }

}
