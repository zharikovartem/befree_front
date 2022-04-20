import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
import MainPage from './MainPage'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnMainPagePropsType = {
    
}

export type MainPagePropsType = MapPropsType & MapDispatchPropsType & OwnMainPagePropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMainPagePropsType, AppStateType>(mapStateToProps,
    {}
)
    (MainPage)  