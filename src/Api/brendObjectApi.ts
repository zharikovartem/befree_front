import { instance, url } from './API'
import * as queryString from 'query-string'

export type GetBrendObjectsByBoundsParamsType = {
    lngMin: number
    lngMax: number
    latMin: number
    latMax: number
    category?: number[]
}

export type GetNearestBrendObjectsParamsType = {
    lng: number
    lat: number
    limit?: number
    distanse?: number
    category?: number[]
    isAtm?: boolean
}

export const brendObjectAPI = {

    getBrendObjectsByBounds(params: GetBrendObjectsByBoundsParamsType, categoryFilter: number[]) {
        console.log(params);
        let stringified: string = queryString.stringify(params);
        const categoryFilterStr = queryString.stringify(categoryFilter);

        
        // console.log(categoryFilterStr);
        categoryFilter.map(item=> {
            stringified = stringified+ '&category[]='+item
        })

        console.log(stringified);

        return instance.get('/api/brands/getByBounds?'+ stringified)
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

    getNearestBrendObjects(params: GetNearestBrendObjectsParamsType) {
        console.log(params);
        const stringified = queryString.stringify(params);
        console.log(stringified);
        return instance.get('/api/brands/getNearest?'+ stringified)
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