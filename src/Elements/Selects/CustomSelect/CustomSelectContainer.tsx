import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import CustomSelect from './CustomSelect'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnCustomSelectPropsType = {
    
}

export type CustomSelectPropsType = MapPropsType & MapDispatchPropsType & OwnCustomSelectPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCustomSelectPropsType, AppStateType>(mapStateToProps,
    {}
)
    (CustomSelect)