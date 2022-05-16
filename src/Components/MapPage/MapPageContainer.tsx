import { connect } from 'react-redux'
import { GeoDataType, calculateRoute, clearRoutes } from '../../Redux/mapReducer'
import {getBrendObjectsByBounds, getNearestBrendObjects } from '../../Redux/brendObjectReducer'
import { AppStateType } from '../../Redux/store'
import { addSuccess, addError } from '../../Redux/messageReducer'
//import { AppStateType } from './../Redux/store'
import MapPage from './MapPage'
import { GetBrendObjectsByBoundsParamsType, GetNearestBrendObjectsParamsType } from '../../Api/brendObjectApi'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    calculateRoute: (start: GeoDataType, stop: GeoDataType, directionsService: any) => void
    getBrendObjectsByBounds: (params: GetBrendObjectsByBoundsParamsType) => void
    getNearestBrendObjects: (params: GetNearestBrendObjectsParamsType) => void
    addSuccess: (value: string) => void
    addError: (value: string) => void
    clearRoutes: () => void
}

type OwnMapPagePropsType = {

}

export type MapPagePropsType = MapPropsType & MapDispatchPropsType & OwnMapPagePropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        routes: state.mapReducer.routes,
        markers: state.brendObjectReducer.brendObjectList,
        atmList: state.brendObjectReducer.atmList,
        // markers: 
        // state.categoryReducer.categoryFilter.length !== 0 ?
        //         state.brendObjectReducer.brendObjectList.filter( item => {
        //             return state.categoryReducer.categoryFilter.includes(item.brandInfo.category.id)
        //         })
        //     :
        //         state.brendObjectReducer.brendObjectList
        // ,

        categoryFilter: state.categoryReducer.categoryFilter
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMapPagePropsType, AppStateType>(mapStateToProps,
    { calculateRoute, getBrendObjectsByBounds, getNearestBrendObjects, addSuccess, addError, clearRoutes }
)
    (MapPage)