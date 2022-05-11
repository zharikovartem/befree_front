import {connect} from 'react-redux'
import { LoginDataType } from '../../Api/authApi'
import { AppStateType } from '../../Redux/store'
import { loginCheck, socialAuth } from './../../Redux/authReduser'
import Login, { SotialLoginDataType } from './Login'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    loginCheck: (data: LoginDataType) => void
    socialAuth: (data: SotialLoginDataType) => void
}

type OwnLoginPropsType = {
    
}

export type LoginPropsType = MapPropsType & MapDispatchPropsType & OwnLoginPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLoginPropsType, AppStateType>(mapStateToProps,
    { loginCheck, socialAuth }
)
    (Login)