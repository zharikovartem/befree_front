import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import authReducer from "./authReduser"
import brendObjectReducer from "./brendObjectReducer"
import categoryReducer from "./categoryReducer"
import mapReducer from "./mapReducer"
import messageReducer from "./messageReducer"


let rootReducer = combineReducers({
    mapReducer: mapReducer,
    categoryReducer: categoryReducer,
    brendObjectReducer: brendObjectReducer,
    messageReducer: messageReducer,
    authReducer: authReducer
})

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store