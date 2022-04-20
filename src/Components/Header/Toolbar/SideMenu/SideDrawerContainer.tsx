import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import SideDrawer from './SideDrawer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnSideDrawerPropsType = {
    isOpen: boolean
}

export type SideDrawerPropsType = MapPropsType & MapDispatchPropsType & OwnSideDrawerPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnSideDrawerPropsType, AppStateType>(mapStateToProps,
    {}
)
    (SideDrawer)