function AccountPag_PrivacySelectItem (text,
    value, backgroundImage, clickListener) {

    var element = document.createElement('div')
    element.className = 'AccountPage_PrivacySelectItem'
    element.appendChild(document.createTextNode(text))
    element.style.backgroundImage = backgroundImage(value)
    element.addEventListener('click', clickListener)

    var classList = element.classList

    return {
        element: element,
        deselect: function () {
            classList.remove('active')
        },
        select: function () {
            classList.add('active')
        },
    }

}
