function CollapseSpaces (string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s{2,}/g, ' ')
}
