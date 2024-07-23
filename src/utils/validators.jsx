export const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/
    return regex.test(name)
}
export const validateNumber = (number) => {
    const regex = /^\d{1,10}$/
    return regex.test(number)
}
export const validateEmail = (email) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return regex.test(email)
}
export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
}
