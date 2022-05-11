import { SotialLoginDataType } from '../Components/Login/Login'
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
    },

    checkAuth() {
        return instance.get('/api/checkauth')
        .then(response => {
            console.log('checkAuth', response)
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
    },

    socialAuth(loginData: SotialLoginDataType) {
        return instance.post('/api/auth', loginData)
        .then(response => {
            console.log('socialAuth', response)
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