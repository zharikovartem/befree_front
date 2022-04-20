import React from 'react'
import { BackdropPropsType } from './BackdropContainer'
import './Backdrop.css'

const Backdrop:React.FC<BackdropPropsType> = (props) => {

    return (
        <div className="backdrop" onClick={props.click} />
    )
}

export default  Backdrop