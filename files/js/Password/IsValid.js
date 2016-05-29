function Password_IsValid (password) {
    return !Password_IsShort(password) && !Password_ContainsOnlyDigits(password)
}
