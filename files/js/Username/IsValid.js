function Username_IsValid (username) {
    return !Username_IsShort(username) &&
        username.length < Username_maxLength &&
        !Username_ContainsIllegalChars(username)
}
