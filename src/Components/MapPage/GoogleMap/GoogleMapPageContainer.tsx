import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
import { getMyCoordinates } from './../../../Redux/mapReducer'
import { getBrendObjectsByBounds } from './../../../Redux/brendObjectReducer'
import GoogleMapPage from './GoogleMapPage'
import { GetBrendObjectsByBoundsParamsType } from '../../../Api/brendObjectApi'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getMyCoordinates: () => void
    getBrendObjectsByBounds: (params: GetBrendObjectsByBoundsParamsType) => void
}

type OwnGoogleMapPagePropsType = {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean
}

export type GoogleMapPagePropsType = MapPropsType & MapDispatchPropsType & OwnGoogleMapPagePropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        MyCoordinates: state.mapReducer.myCoordinates,
        brandObjectsList: state.brendObjectReducer.brendObjectList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnGoogleMapPagePropsType, AppStateType>(mapStateToProps,
    { getMyCoordinates, getBrendObjectsByBounds }
)
    (GoogleMapPage)