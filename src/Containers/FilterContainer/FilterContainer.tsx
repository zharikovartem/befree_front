import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
//import { AppStateType } from './../Redux/store'
import Filter from './Filter'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnFilterPropsType = {
    children: React.ReactNode
    filter: React.ReactNode
}

export type FilterPropsType = MapPropsType & MapDispatchPropsType & OwnFilterPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnFilterPropsType, AppStateType>(mapStateToProps,
    {}
)
    (Filter)