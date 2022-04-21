import { connect } from 'react-redux'
import { GeoDataType, calculateRoute } from '../../Redux/mapReducer'
import {getBrendObjectsByBounds, getNearestBrendObjects } from '../../Redux/brendObjectReducer'
import { AppStateType } from '../../Redux/store'
//import { AppStateType } from './../Redux/store'
import TestMapPage from './TestMapPage'
import { GetBrendObjectsByBoundsParamsType, GetNearestBrendObjectsParamsType } from '../../Api/brendObjectApi'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    calculateRoute: (start: GeoDataType, stop: GeoDataType, directionsService: any) => void
    getBrendObjectsByBounds: (params: GetBrendObjectsByBoundsParamsType) => void
    getNearestBrendObjects: (params: GetNearestBrendObjectsParamsType) => void
}

type OwnTestMapPagePropsType = {

}

export type TestMapPagePropsType = MapPropsType & MapDispatchPropsType & OwnTestMapPagePropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        routes: state.mapReducer.routes,
        markers: state.brendObjectReducer.brendObjectList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnTestMapPagePropsType, AppStateType>(mapStateToProps,
    { calculateRoute, getBrendObjectsByBounds, getNearestBrendObjects }
)
    (TestMapPage)