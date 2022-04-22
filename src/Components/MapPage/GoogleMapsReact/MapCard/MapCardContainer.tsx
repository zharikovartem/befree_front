import { connect } from 'react-redux'
import { GeoDataType, calculateRoute } from '../../../../Redux/mapReducer'
import { addSuccess } from '../../../../Redux/messageReducer'
import { AppStateType } from '../../../../Redux/store'
import MapCard from './MapCard'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    calculateRoute: (start: GeoDataType, stop: GeoDataType, google: any) => void
    addSuccess: (error: string) => void
}

type OwnMapCardPropsType = {
    markerData: any
}

export type MapCardPropsType = MapPropsType & MapDispatchPropsType & OwnMapCardPropsType

let mapStateToProps = (state: AppStateType) => {
    return {

    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMapCardPropsType, AppStateType>(mapStateToProps,
    { calculateRoute, addSuccess }
)
    (MapCard)