import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
import MapCard from './MapCard'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
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
    {}
)
    (MapCard)