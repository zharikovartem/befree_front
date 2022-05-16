import { Dispatch } from 'redux'
import { refreshToken } from '../Api/API'
import { categoryAPI } from '../Api/categoryApi'
import { BaseThunkType, InferActionsTypes } from './store'


export type categoryTpe = {
    id: number
    title: string
    logoFileName: string
}

export type InitialStateType ={
    categoryesList: categoryTpe[] | null
    categoryFilter: number[]
}

let initialState:InitialStateType = {
    categoryesList: null,
    categoryFilter: []
}

type ActionsType = InferActionsTypes<typeof actions>

const categoryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CATEGORY/SET_CATEGORYES':
            return {
                    ...state,
                    categoryesList: action.categoryesList
            }

        case 'CATEGORY/SET_CATEGORY_FILTER':
            return {
                ...state,
                categoryFilter: action.categoryFilter
            }

        default:
            return state;
    }
}

export const actions = {
    setCategoyes: (categoryesList: categoryTpe[]) => ({type: 'CATEGORY/SET_CATEGORYES', categoryesList} as const),
    setCategoryFilter: (categoryFilter: number[]) => ({type: 'CATEGORY/SET_CATEGORY_FILTER', categoryFilter} as const)
}

export const changeCategoryFilter = (categoryFilter: number[]): ThunkType => {
    return async (dispatch, getState) => {
        dispatch( actions.setCategoryFilter(categoryFilter) )
    }
}

export const getActiveCategoryes = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await categoryAPI.getActiveCategoryes()
        if (response.status === 200) {
            dispatch( actions.setCategoyes(response.data) )
        } else {
            localStorage.removeItem('apikey')
            refreshToken()
            // dispatch(getActiveCategoryes())
        }
    }
}

export default categoryReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>