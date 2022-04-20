import React from 'react'
import { SideMenuPropsType } from './SideMenuContainer'
import './SideMenu.css'

const SideMenu: React.FC<SideMenuPropsType> = (props) => {

    return (
        <button className="toggle-button" onClick={props.click}>
            <div className="toggle-button-line" />
            <div className="toggle-button-line" />
            <div className="toggle-button-line" />
        </button>
    )
}

export default SideMenu