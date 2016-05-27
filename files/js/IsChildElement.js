function IsChildElement (parentNode, childNode) {
    while (childNode !== null) {
        if (childNode === parentNode) return true
        childNode = childNode.parentNode
    }
    return false
}
