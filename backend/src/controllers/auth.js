export const register = (req, res, next) => {
    try {
        res.send('Register route works!')
    } catch (e) {
        next(e)
    }
}

export const login = (req, res, next) => {
    try {
        res.send('Login works!')
    } catch (e) {
        next(e)
    }
}

export const logout = (req, res, next) => {
    try {
        res.send('Logout works!')
    } catch (e) {
        next(e)
    }
}

export const refreshToken = (req, res, next) => {
    try {
        res.send('Refresh works!')
    } catch (e) {
        next(e)
    }
}