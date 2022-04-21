import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import BrandsCategoryForm from './BrandsCategoryForm'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnBrandsCategoryFormPropsType = {
    // setCenter()
}

export type BrandsCategoryFormPropsType = MapPropsType & MapDispatchPropsType & OwnBrandsCategoryFormPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        brendObjectMenuList: state.brendObjectReducer.brendObjectMenuList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnBrandsCategoryFormPropsType, AppStateType>(mapStateToProps,
    {}
)
    (BrandsCategoryForm)