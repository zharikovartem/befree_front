import {connect} from 'react-redux'
import { GetNearestBrendObjectsParamsType } from '../../Api/brendObjectApi'
import { AppStateType } from '../../Redux/store'
import { getNearestBrendObjects } from './../../Redux/brendObjectReducer'
import MapPage from './MapPage'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getNearestBrendObjects: (params: GetNearestBrendObjectsParamsType) => void
}

type OwnMapPagePropsType = {
    
}

export type MapPagePropsType = MapPropsType & MapDispatchPropsType & OwnMapPagePropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMapPagePropsType, AppStateType>(mapStateToProps,
    { getNearestBrendObjects }
)
    (MapPage)