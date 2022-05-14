import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
//import { AppStateType } from './../../Redux/store'
import CreateObject from './CreateObject'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnCreateObjectPropsType = {
    
}

export type CreateObjectPropsType = MapPropsType & MapDispatchPropsType & OwnCreateObjectPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCreateObjectPropsType, AppStateType>(mapStateToProps,
    {}
)
    (CreateObject)