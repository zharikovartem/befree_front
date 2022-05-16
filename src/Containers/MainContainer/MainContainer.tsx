import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
import { checkAuth } from './../../Redux/authReduser'
import Main from './Main'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    checkAuth: () => void
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
    { checkAuth }
)
    (Main)