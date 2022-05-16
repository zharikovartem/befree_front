import { Dispatch } from 'redux'
import { brendObjectAPI, GetBrendObjectsByBoundsParamsType, GetNearestBrendObjectsParamsType } from '../Api/brendObjectApi'
import { BaseThunkType, InferActionsTypes } from './store'

export type BrendType = {}

export type AddressType = {
    id: number
    latitude: number
    longitude: number
    data: string
    state: string
    country: string
}

export type WorkingSchedulesType = {}

export type PhoneType = {
    id: number
    number: string
}

export type RouteType = {}

export type BrendObjectType = {
    address: AddressType
    id: number
    additionalInformation: string | null
    phoneNumbers: PhoneType[]
    isActive: boolean
    workingSchedules: any
    hasDelivery: boolean
    typeObject: string //???
    tasks: any
    routeUser: any
    tags: any
    isLike: boolean
    isPin: boolean
    brandInfo: any
}

export type AtmType = {
    address: AddressType
    id: number
    lat: number
    lng: number
    phoneNumbers: PhoneType[]
    title: string
    workingShedules: any
}

export type InitialStateType ={
    brendObjectList: any[]
    brendObjectMenuList: any[]
    atmList: AtmType[]
    atmMenuList: AtmType[]
}

let initialState:InitialStateType = {
    brendObjectList: [],
    brendObjectMenuList: [],
    atmList: [],
    atmMenuList: []
}

type ActionsType = InferActionsTypes<typeof actions>

const brendObjectReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'BREND_OBJECT/SET_BREND_OBJECTS':
            return {
                    ...state,
                    brendObjectList: action.brendObjectList,
                    atmList: action.atm
            }

        case 'BREND_OBJECT/SET_BREND_OBJECTS_MENU_LIST':
            return {
                ...state,
                brendObjectMenuList: action.brendObjectList,
                atmMenuList: action.atm
            }

        default:
            return state;
    }
}

export const actions = {
    setBrendObjects: (brendObjectList: any[], atm: AtmType[]) => ({type: 'BREND_OBJECT/SET_BREND_OBJECTS', brendObjectList, atm} as const),
    setBrendObjectsMenuList: (brendObjectList: any[], atm: AtmType[]) => ({type: 'BREND_OBJECT/SET_BREND_OBJECTS_MENU_LIST', brendObjectList, atm} as const),
}

export const getBrendObjectsByBounds = (params: GetBrendObjectsByBoundsParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const categoryFilter = getState().categoryReducer.categoryFilter
        // params.category = [...categoryFilter]
        console.log('categoryFilter', categoryFilter)
        const response = await brendObjectAPI.getBrendObjectsByBounds(params, categoryFilter)
        if (response.status === 200) {
            dispatch( actions.setBrendObjects(response.data.brandObjects, response.data.atm) )
        }
    }
}

export const getNearestBrendObjects = (params:GetNearestBrendObjectsParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await brendObjectAPI.getNearestBrendObjects(params)
        if (response.status === 200) {
            console.log('getNearestBrendObjects', response)
            dispatch( actions.setBrendObjectsMenuList(response.data.brandObjects, response.data.atm) )
        }
    }
}

export default brendObjectReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>   