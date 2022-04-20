import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
import AllBrandsForm from './AllBrandsForm'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnAllBrandsFormPropsType = {
    
}

export type AllBrandsFormPropsType = MapPropsType & MapDispatchPropsType & OwnAllBrandsFormPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        categoryesList: state.categoryReducer.categoryesList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnAllBrandsFormPropsType, AppStateType>(mapStateToProps,
    {}
)
    (AllBrandsForm) 