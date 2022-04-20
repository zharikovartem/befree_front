import { Dispatch } from 'redux'
import { brendObjectAPI, GetBrendObjectsByBoundsParamsType, GetNearestBrendObjectsParamsType } from '../Api/brendObjectApi'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType ={
    brendObjectList: any[]
    brendObjectMenuList: any[]
}

let initialState:InitialStateType = {
    brendObjectList: [],
    brendObjectMenuList: []
}

type ActionsType = InferActionsTypes<typeof actions>

const brendObjectReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'BREND_OBJECT/SET_BREND_OBJECTS':
            return {
                    ...state,
                    brendObjectList: action.brendObjectList
            }

        case 'BREND_OBJECT/SET_BREND_OBJECTS_MENU_LIST':
            return {
                ...state,
                brendObjectMenuList: action.brendObjectList
            }

        default:
            return state;
    }
}

export const actions = {
    setBrendObjects: (brendObjectList: any[]) => ({type: 'BREND_OBJECT/SET_BREND_OBJECTS', brendObjectList} as const),
    setBrendObjectsMenuList: (brendObjectList: any[]) => ({type: 'BREND_OBJECT/SET_BREND_OBJECTS_MENU_LIST', brendObjectList} as const),
}

export const getBrendObjectsByBounds = (params: GetBrendObjectsByBoundsParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await brendObjectAPI.getBrendObjectsByBounds(params)
        if (response) {
            dispatch( actions.setBrendObjects(response.data.brandObjects) )
        }
    }
}

export const getNearestBrendObjects = (params:GetNearestBrendObjectsParamsType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await brendObjectAPI.getNearestBrendObjects(params)
        if (response) {
            console.log('getNearestBrendObjects', response)
            dispatch( actions.setBrendObjectsMenuList(response.data.brandObjects) )
        }
    }
}

export default brendObjectReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>   