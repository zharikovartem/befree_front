import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
import { getActiveCategoryes } from '../../../Redux/categoryReducer'
//import { AppStateType } from './../Redux/store'
import MapMenu from './MapMenu'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getActiveCategoryes: () => void
}

type OwnMapMenuPropsType = {
    showDrawer: (ev: any) => void
}

export type MapMenuPropsType = MapPropsType & MapDispatchPropsType & OwnMapMenuPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        categoryesList: state.categoryReducer.categoryesList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMapMenuPropsType, AppStateType>(mapStateToProps,
    { getActiveCategoryes }
)
    (MapMenu)