const isBrowser = typeof window !== `undefined`

export const setUser = user => (window.localStorage.weverUser = JSON.stringify(user))

const getUser = () => {
    if (isBrowser) {
        if (window.localStorage.weverUser) {
            let user = JSON.parse(window.localStorage.weverUser)
            return user ? user : {}
        }
    }
    return {}
}

export const isLoggedIn = () => {
    if (!isBrowser) return false

    const user = getUser()
    if (user) return !!user.userId
}

export const getUserImage = () => {
    const user = getUser()
    if (Object.keys(user).length) {
        return user.imageUrl;
    } else {
        return ''
    }
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
    if (!isBrowser) return
    setUser({})
    callback()
}
