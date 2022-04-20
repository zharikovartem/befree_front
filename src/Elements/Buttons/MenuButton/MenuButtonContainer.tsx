import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
//import { AppStateType } from './../Redux/store'
import MenuButton from './MenuButton'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnMenuButtonPropsType = {
    title: string
    src: string
}

export type MenuButtonPropsType = MapPropsType & MapDispatchPropsType & OwnMenuButtonPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMenuButtonPropsType, AppStateType>(mapStateToProps,
    {}
)
    (MenuButton)