function WorkPage_ChatPanel_SentTextMessage (text, time) {

    var classPrefix = 'WorkPage_ChatPanel_SentTextMessage'

    var date = new Date(time)

    var timeString = TwoDigitPad(date.getUTCHours() + ':' + date.getUTCMinutes())

    var timeElement = document.createElement('div')
    timeElement.className = classPrefix + '-time'
    timeElement.appendChild(document.createTextNode(timeString))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(timeElement)
    element.appendChild(document.createTextNode(text))

    return {
        element: element,
        addText: function (text) {
            element.appendChild(document.createElement('br'))
            element.appendChild(document.createTextNode(text))
        },
    }

}
