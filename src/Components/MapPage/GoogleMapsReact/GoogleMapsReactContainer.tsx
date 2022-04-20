import { connect } from 'react-redux'
import { GetBrendObjectsByBoundsParamsType } from '../../../Api/brendObjectApi'
import { AppStateType } from '../../../Redux/store'
import { getBrendObjectsByBounds } from './../../../Redux/brendObjectReducer'
import { calculateRoute, GeoDataType } from './../../../Redux/mapReducer'
import { getMyCoordinates } from './../../../Redux/mapReducer'
import GoogleMapsReact from './GoogleMapsReact'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getMyCoordinates: () => void
    getBrendObjectsByBounds: (params: GetBrendObjectsByBoundsParamsType) => void
    calculateRoute: (start: GeoDataType, stop: GeoDataType, directionsService: any) => void
}

type OwnGoogleMapsReactPropsType = {
    initialCenter?: google.maps.LatLngLiteral
}

export type GoogleMapsReactPropsType = MapPropsType & MapDispatchPropsType & OwnGoogleMapsReactPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        brandObjectsList: state.brendObjectReducer.brendObjectList,
        googleMap: state.mapReducer.google,
        routes: state.mapReducer.routes
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnGoogleMapsReactPropsType, AppStateType>(mapStateToProps,
    { getMyCoordinates, getBrendObjectsByBounds, calculateRoute }
)
    (GoogleMapsReact)