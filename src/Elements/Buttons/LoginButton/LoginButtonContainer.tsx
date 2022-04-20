import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
import LoginButton from './LoginButton'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnLoginButtonPropsType = {
    title: string
    src?: string
    type: 'modal' | 'link'
    modal?: React.FC
    modalProps?: {
        title: string
    }// данные для модалки
    modalComponent?: React.FC // форма модалки
}

export type LoginButtonPropsType = MapPropsType & MapDispatchPropsType & OwnLoginButtonPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLoginButtonPropsType, AppStateType>(mapStateToProps,
    {}
)
    (LoginButton)