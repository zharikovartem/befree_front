import { GoogleAPI } from 'google-maps-react'
import { Dispatch } from 'redux'
// import { authAPI } from '../Api/authAPI'
import { BaseThunkType, InferActionsTypes } from './store'

export type GeoDataType = string | google.maps.LatLng | google.maps.LatLngLiteral | google.maps.Place

export type CoordinatesType = {
    lat: number
    lng: number
}

export type InitialStateType ={
    myCoordinates: CoordinatesType | null // ?
    google: GoogleAPI | undefined // ?
    routes: google.maps.DirectionsResult | undefined
}

let initialState:InitialStateType = {
    myCoordinates: null,
    google: undefined,
    routes: undefined
}

type ActionsType = InferActionsTypes<typeof actions>

const mapReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MAP/SET_MY_COORDINATES':
            return {
                    ...state,
                    myCoordinates: action.coordinates
            }

        case 'MAP/SET_GOOGLE_MAP':
            return {
                ...state,
                google: action.google
            }

        case 'MAP/SET_ROUTES':
            return {
                ...state,
                routes: action.routes
            }
        default:
            return state;
    }
}

export const actions = {
    setMyCoordinates: (coordinates: CoordinatesType) => ({type: 'MAP/SET_MY_COORDINATES', coordinates} as const),
    setGoogleMap: (google: GoogleAPI) => ({type: 'MAP/SET_GOOGLE_MAP', google} as const),
    setRoutes: (routes: google.maps.DirectionsResult| undefined) => ({type: 'MAP/SET_ROUTES', routes} as const),
}

export const getMyCoordinates = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = navigator.geolocation.getCurrentPosition( (position) => {
            return {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })

        console.log(response);
        
    }
}

export const clearRoutes = (): ThunkType => {
    return async (dispatch, getState) => {
        dispatch( actions.setRoutes(undefined) )
    }
}

export const calculateRoute = (start: GeoDataType, stop: GeoDataType, google: any): ThunkType => {
    console.log('calculateRoute')
    return async (dispatch, getState) => {
        const directionsService = new google.maps.DirectionsService()       
        const response = await directionsService.route({
            origin: start,
            destination: stop,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus)=>{
            console.log('calculateRoute result', result)
            console.log('calculateRoute status', status)
        })

        console.log(response);
        dispatch( actions.setRoutes(response) )
    }
}

export default mapReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>   