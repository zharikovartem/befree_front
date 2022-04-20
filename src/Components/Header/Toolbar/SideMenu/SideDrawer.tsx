import React from 'react'
import { SideDrawerPropsType } from './SideDrawerContainer';
import './SideDrawer.css'
import MenuData from '../MenuData/MenuData';

const SideDrawer: React.FC<SideDrawerPropsType> = (props) => {

    let drawerClasses = ["side-drawer"];

    if (props.isOpen) {
        drawerClasses = ["side-drawer", "open"];
    }

    return (
        <nav className={drawerClasses.join(" ")}>
            <MenuData />
        </nav>
    )
}

export default SideDrawer