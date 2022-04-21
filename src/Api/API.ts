import axios from 'axios'

// export const url = process.env.REACT_APP_PROXY_URL
export const url = 'https://befree.com/'
// export const url = 'http://localhost:8080/'

export let instance = axios.create({
    withCredentials: false,
    baseURL: url,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('apikey'),
        'Content-Type': 'multipart/form-data',
        'Accept': "application/json"
    }
})