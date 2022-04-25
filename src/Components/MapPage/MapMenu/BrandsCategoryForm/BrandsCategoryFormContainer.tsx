import {connect} from 'react-redux'
import { CoordinatesType } from '../../../../Redux/mapReducer'
import { addSuccess, addError } from '../../../../Redux/messageReducer'
import { AppStateType } from '../../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import BrandsCategoryForm from './BrandsCategoryForm'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    addSuccess: (message: string) => void
    addError: (message: string) => void
}

type OwnBrandsCategoryFormPropsType = {
    setCenter: (coordinates: CoordinatesType) => void
    setRoute: (coordinates: CoordinatesType) => void
    onClose: () => void
    myCoords: CoordinatesType
    getRoutes: (routesResp: any) => void
}

export type BrandsCategoryFormPropsType = MapPropsType & MapDispatchPropsType & OwnBrandsCategoryFormPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        brendObjectMenuList: state.brendObjectReducer.brendObjectMenuList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnBrandsCategoryFormPropsType, AppStateType>(mapStateToProps,
    { addSuccess, addError }
)
    (BrandsCategoryForm)