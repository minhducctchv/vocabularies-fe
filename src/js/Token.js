const TOKEN_LOCAL = 'TOKEN_LOCAL'

export function getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_LOCAL))
}

export function saveToken(objToken) {
    localStorage.setItem(TOKEN_LOCAL, JSON.stringify(objToken))
}