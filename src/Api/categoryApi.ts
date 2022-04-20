import { instance, url } from './API'

export const categoryAPI = {
    getActiveCategoryes() {
        return instance.get('api/categories')
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
}