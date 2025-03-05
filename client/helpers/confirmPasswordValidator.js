export function confirmPasswordValidator(password, confirmpassword) {
    if (!confirmpassword) return "Confirm Password can't be empty."
    if (password != confirmpassword) return 'Password and Confirm Password does not match.'
    return ''
}
