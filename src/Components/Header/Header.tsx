import React, { useState } from 'react'
import { HeaderPropsType } from './HeaderContainer'
import SideDrawer from './Toolbar/SideMenu/SideDrawerContainer'
import Toolbar from './Toolbar/ToolbarContainer'
import './Header.css'
import Backdrop from './Toolbar/Backdrop/BackdropContainer'
import { Affix } from 'antd'

const Header:React.FC<HeaderPropsType> = (props) => {

    const [sideDrawerOpen, setSideDrawerOpen] = useState<boolean>(false)

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen)
    }

    const backDropClickHandler = () => {
        setSideDrawerOpen(false)
    }

    let backdrop: React.ReactNode = <></>

    if (sideDrawerOpen) {
        backdrop = <Backdrop click={backDropClickHandler} />;
    }

    return (
        <Affix offsetTop={0}>
        <div 
            // className='container' 
            style={{ 
                height: "100%",
                // maxWidth: '1284px'
            }}
        >
            <Toolbar drawerToggleClickHandler={drawerToggleClickHandler} />
            <SideDrawer isOpen={sideDrawerOpen} />
            {backdrop}
        </div>
        </Affix>
    )
}

export default  Header