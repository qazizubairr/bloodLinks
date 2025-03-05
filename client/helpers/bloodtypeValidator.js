export function bloodtypeValidator(bloodtype) {
    if (!bloodtype) return "Blood Type can't be empty."
    const bloodTypeRegex = /^(A|B|AB|O)(\+|-)$/;

    if (bloodTypeRegex.test(bloodtype)) {
        return ''
    } else {
        return "Blood Type is not valid."
    }



}