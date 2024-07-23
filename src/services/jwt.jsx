import { isExpired, decodeToken } from 'react-jwt'

export function setJWT(token) {
    localStorage.setItem('Token', token)
}

export function getJWT() {
    return localStorage.getItem('Token') || null;
}

export function removeJWT() {
    localStorage.removeItem('Token')
}

export function expiredJWT() {
    const expired = isExpired(getJWT())
    return expired
}

export function decodedJWT() {
    const decoded = decodeToken(getJWT())

    return decoded
}

export function decodedDataJWT() {
    const decoded = decodeToken(getJWT())
    const data = decoded.data

    return data
}