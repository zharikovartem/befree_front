import { Dispatch } from 'redux'
import { authAPI, LoginDataType } from '../Api/authApi'
import { addSuccess, messageActions } from './messageReducer'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType ={
    test: boolean
}

let initialState:InitialStateType = {
    test: false
}

type ActionsType = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/TEST':
            return {
                    ...state,
                    test: action.test
            }
        default:
            return state;
    }
}

export const actions = {
    setAction: (test: boolean) => ({type: 'AUTH/TEST', test} as const),
}

export const loginCheck = (data:LoginDataType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await authAPI.loginCheck(data)
        console.log(response);
        
        if (response.token) {
            localStorage.setItem('apikey', response.token);
            console.log(response)
            // addToken(response.token)
            dispatch( addSuccess('OK') )
            // console.log('dispatch(tokenCheck())');
            // dispatch(tokenCheck())
        } else {
            console.log('addSnack');
            // dispatch( actions.setError(response.message) )
            // dispatch( actions.setError(null) )
        }
    }
}

export default authReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>