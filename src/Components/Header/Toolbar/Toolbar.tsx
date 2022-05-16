import React from 'react'
import SideMenu from './SideMenu/SideMenuContainer'
import { ToolbarPropsType } from './ToolbarContainer'
import './Toolbar.css'
import { Link } from 'react-router-dom'
import LoginButton from '../../../Elements/Buttons/LoginButton/LoginButtonContainer'
import MenuData from './MenuData/MenuData'
import CustomSelect from '../../../Elements/Selects/CustomSelect/CustomSelectContainer'
import styled from 'styled-components'
import Login from '../../Login/LoginContainer'
import { url } from '../../../Api/API'

const ToolbarLogo = styled.div`
margin-right: 20px;

@media (max-width: 1267px) {
    max-width: 140px;
}

@media (max-width: $md2+px) {
    max-width: 190px;
}

@media (max-width: 595px) {
        max-width: 128px;
        display: none;
}
`

const Toolbar: React.FC<ToolbarPropsType> = (props) => {

    return (
        <header className="toolbar">
            <nav className="toolbar_navigator">
                <div />
                {/* <div className="toggle-btn">
                    <SideMenu click={props.drawerToggleClickHandler} />
                </div> */}
                <ToolbarLogo className="toolbar_logo">
                    {/* <Link to="/"> */}
                    <a href='https://befree.com/'>
                        <img src={url+'build/site/images/logo/logo.svg'} alt='BeFree' />
                    </a>
                    {/* </Link> */}
                </ToolbarLogo>
                <div className="spacer" />

                <div className="toolbar_navigation-items">
                    <MenuData />
                </div>

                {/* <CustomSelect /> */}

                <LoginButton 
                    title='Login' 
                    src='login' 
                    type='modal'
                    modalProps={{
                        title: 'Login'
                    }}
                    modalComponent={Login}
                />

                <div className="toggle-btn">
                    <SideMenu click={props.drawerToggleClickHandler} />
                </div>

            </nav>
        </header>
    )
}

export default Toolbar