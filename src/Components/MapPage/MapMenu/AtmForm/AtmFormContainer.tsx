import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
import { addSuccess, addError } from '../../../../Redux/messageReducer'
import AtmForm from './AtmForm'
import { CoordinatesType } from '../../../../Redux/mapReducer'
import { InfoWindowDataType } from '../../GoogleMapsReact/GoogleMap'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    addSuccess: (message: string) => void
    addError: (message: string) => void
}

type OwnAtmFormPropsType = {
    setCenter: (coordinates: CoordinatesType, data?: InfoWindowDataType) => void
    setRoute: (coordinates: CoordinatesType) => void
    onClose: () => void
    myCoords: CoordinatesType
    getRoutes: (routesResp: any) => void
}

export type AtmFormPropsType = MapPropsType & MapDispatchPropsType & OwnAtmFormPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        atmMenuList: state.brendObjectReducer.atmMenuList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnAtmFormPropsType, AppStateType>(mapStateToProps,
    { addSuccess, addError }
)
    (AtmForm)