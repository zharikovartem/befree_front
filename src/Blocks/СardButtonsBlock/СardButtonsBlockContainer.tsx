import {connect} from 'react-redux'
import { AppStateType } from '../../Redux/store'
import СardButtonsBlock from './СardButtonsBlock'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    
}

type OwnСardButtonsBlockPropsType = {
    target: any
    onGetGoogleLink: (brendObject: any) => void
    onNavi: (brendObject: any) => void
}

export type СardButtonsBlockPropsType = MapPropsType & MapDispatchPropsType & OwnСardButtonsBlockPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnСardButtonsBlockPropsType, AppStateType>(mapStateToProps,
    {}
)
    (СardButtonsBlock)