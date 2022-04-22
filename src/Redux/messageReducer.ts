import { Dispatch } from 'redux'
// import { authAPI } from '../Api/authAPI'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType ={
    success: string[]
    error: string[]
}

let initialState:InitialStateType = {
    success: [],
    error: []
}

type ActionsType = InferActionsTypes<typeof messageActions>

const messageReducer = (state = initialState, messageActions: ActionsType): InitialStateType => {
    switch (messageActions.type) {
        case 'MESSAGE/SET_ERROR':
            return {
                    ...state,
                    error: [...state.error, messageActions.error]
            }

        case 'MESSAGE/DELETE_ERROR':
            return {
                ...state,
                error: [...state.error.filter(i=>i!==messageActions.error)]
            }

        case 'MESSAGE/SET_SUCCESS':
            console.log(messageActions.success)
            return {
                    ...state,
                    success: [...state.error, messageActions.success]
            }

        case 'MESSAGE/DELETE_SUCCES':
            console.log(messageActions.success)
            return {
                ...state,
                success: [...state.error.filter(i=>i!==messageActions.success)]
            }

        default:
            return state;
    }
}

export const messageActions = {
    setError: (error: string) => ({type: 'MESSAGE/SET_ERROR', error} as const),
    deleteError: (error: string) => ({type: 'MESSAGE/DELETE_ERROR', error} as const),
    setSuccess: (success: string) => ({type: 'MESSAGE/SET_SUCCESS', success} as const),
    deleteSuccess: (success: string) => ({type: 'MESSAGE/DELETE_SUCCES', success} as const),
}

export const addError = (error: string): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(messageActions.setError(error))
        dispatch(messageActions.deleteError(error))
    }
}

export const addSuccess = (data: string): ThunkType => {
    console.log('addSuccess')
    return async (dispatch, getState) => {
        console.log('addSuccess')
        dispatch(messageActions.setSuccess(data))
        // dispatch(messageActions.deleteSuccess(data))
    }
}

export default messageReducer

type ActionsTypes = InferActionsTypes<typeof messageActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>