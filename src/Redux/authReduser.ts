import { Dispatch } from 'redux'
import { authAPI, LoginDataType } from '../Api/authApi'
import { addSuccess, messageActions } from './messageReducer'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType ={
    isAuth: boolean
}

let initialState:InitialStateType = {
    isAuth: false
}

type ActionsType = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/TEST':
            return {
                    ...state,
                    isAuth: action.isAuth
            }
        default:
            return state;
    }
}

export const actions = {
    setAuth: (isAuth: boolean) => ({type: 'AUTH/TEST', isAuth} as const),
}

export const loginCheck = (data:LoginDataType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await authAPI.loginCheck(data)
        console.log(response);
        
        if (response.status === 200) {
            localStorage.setItem('apikey', response.data.token);
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