import { instance, url } from './API'

export type LoginDataType = {
    username: string
    password: string
}

export const authAPI = {
    loginCheck(loginData: LoginDataType) {
        return instance.post('/api/login_check', loginData)
        .then(response => {
            return response
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}