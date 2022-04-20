import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import Backdrop from './Backdrop'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnBackdropPropsType = {
    click: () => void
}

export type BackdropPropsType = MapPropsType & MapDispatchPropsType & OwnBackdropPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnBackdropPropsType, AppStateType>(mapStateToProps,
    {}
)
    (Backdrop)