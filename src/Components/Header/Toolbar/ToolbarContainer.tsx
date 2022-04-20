import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import Toolbar from './Toolbar'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnToolbarPropsType = {
    drawerToggleClickHandler: () => void
}

export type ToolbarPropsType = MapPropsType & MapDispatchPropsType & OwnToolbarPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnToolbarPropsType, AppStateType>(mapStateToProps,
    {}
)
    (Toolbar)