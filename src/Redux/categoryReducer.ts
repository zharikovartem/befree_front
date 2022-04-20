import { Dispatch } from 'redux'
import { categoryAPI } from '../Api/categoryApi'
import { BaseThunkType, InferActionsTypes } from './store'


export type categoryTpe = {
    id: number
    title: string
    logoFileName: string
}

export type InitialStateType ={
    categoryesList: categoryTpe[] | null
}

let initialState:InitialStateType = {
    categoryesList: null
}

type ActionsType = InferActionsTypes<typeof actions>

const categoryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CATEGORY/SET_CATEGORYES':
            return {
                    ...state,
                    categoryesList: action.categoryesList
            }
        default:
            return state;
    }
}

export const actions = {
    setCategoyes: (categoryesList: categoryTpe[]) => ({type: 'CATEGORY/SET_CATEGORYES', categoryesList} as const),
}

export const getActiveCategoryes = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await categoryAPI.getActiveCategoryes()
        if (response) {
            dispatch( actions.setCategoyes(response.data) )
        }
    }
}

export default categoryReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>