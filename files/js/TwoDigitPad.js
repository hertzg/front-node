function TwoDigitPad (n) {
    var s = String(n)
    if (s.length === 1) s = '0' + s
    return s
}
