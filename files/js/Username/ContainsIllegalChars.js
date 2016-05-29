function Username_ContainsIllegalChars (username) {
    return username.match(/[^a-z0-9_.-]/i)
}
