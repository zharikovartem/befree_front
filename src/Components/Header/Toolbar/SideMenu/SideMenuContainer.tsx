import {connect} from 'react-redux'
import { AppStateType } from '../../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import SideMenu from './SideMenu'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnSideMenuPropsType = {
    click: () => void
}

export type SideMenuPropsType = MapPropsType & MapDispatchPropsType & OwnSideMenuPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnSideMenuPropsType, AppStateType>(mapStateToProps,
    {}
)
    (SideMenu)