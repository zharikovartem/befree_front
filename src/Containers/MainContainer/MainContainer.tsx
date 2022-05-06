import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
//import { AppStateType } from './../Redux/store'
import Main from './Main'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnMainPropsType = {
    children: React.ReactNode
}

export type MainPropsType = MapPropsType & MapDispatchPropsType & OwnMainPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        error: state.messageReducer.error,
        success: state.messageReducer.success,
        isAuth: state.authReducer.isAuth
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMainPropsType, AppStateType>(mapStateToProps,
    {}
)
    (Main)