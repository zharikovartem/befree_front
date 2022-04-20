import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
//import { AppStateType } from './../Redux/store'
import Header from './Header'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnHeaderPropsType = {
    
}

export type HeaderPropsType = MapPropsType & MapDispatchPropsType & OwnHeaderPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnHeaderPropsType, AppStateType>(mapStateToProps,
    {}
)
    (Header)