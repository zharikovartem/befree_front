import {connect} from 'react-redux'
import { AppStateType } from '../../../Redux/store'
import GreenButton from './GreenButton'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnGreenButtonPropsType = {
    value: string
}

export type GreenButtonPropsType = MapPropsType & MapDispatchPropsType & OwnGreenButtonPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnGreenButtonPropsType, AppStateType>(mapStateToProps,
    {}
)
    (GreenButton)