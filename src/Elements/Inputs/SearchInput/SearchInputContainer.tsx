import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import SearchInput from './SearchInput'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnSearchInputPropsType = {
    placeholder?: string
}

export type SearchInputPropsType = MapPropsType & MapDispatchPropsType & OwnSearchInputPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnSearchInputPropsType, AppStateType>(mapStateToProps,
    {}
)
    (SearchInput)