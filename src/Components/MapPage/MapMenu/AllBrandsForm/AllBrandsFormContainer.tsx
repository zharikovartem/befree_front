import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
import { changeCategoryFilter } from '../../../../Redux/categoryReducer'
import AllBrandsForm from './AllBrandsForm'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    changeCategoryFilter: (categoryFilter: number[]) => void
}

type OwnAllBrandsFormPropsType = {
    
}

export type AllBrandsFormPropsType = MapPropsType & MapDispatchPropsType & OwnAllBrandsFormPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        categoryesList: state.categoryReducer.categoryesList,
        categoryFilter: state.categoryReducer.categoryFilter
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnAllBrandsFormPropsType, AppStateType>(mapStateToProps,
    { changeCategoryFilter }
)
    (AllBrandsForm) 