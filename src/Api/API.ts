import axios from 'axios'

// export const url = process.env.REACT_APP_PROXY_URL
export const url = 'https://befree.com/'
// export const url = 'http://localhost:8080/'

export let instance = localStorage.getItem('apikey') ? axios.create({
    withCredentials: false,
    baseURL: url,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('apikey'),
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
}) 
:
axios.create({
    withCredentials: false,
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
}) 

export const refreshToken = () => {
    const token = localStorage.getItem('apikey')

    if (token) {
        instance = axios.create({
            withCredentials: false,
            baseURL: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apikey'),
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        })
    } else {
        instance = axios.create({
            withCredentials: false,
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        })
    }
}