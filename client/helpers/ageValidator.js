export function ageValidator(age) {
    if (!age) return "Age can't be empty."

    const parsedAge = parseInt(age);

    if (parsedAge >= 18 && parsedAge <= 65) {
        return ''
    } else {
        return "Age must be between 18-65."
    }


}
