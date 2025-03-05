export function phoneValidator(phone) {
    if (!phone) return "Phone Number can't be empty."
    if (phone.length != 11) return 'InValid Phone Number.'
    return ''
}
