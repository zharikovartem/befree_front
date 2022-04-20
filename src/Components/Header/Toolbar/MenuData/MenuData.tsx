import React from 'react'
import MenuButton from '../../../../Elements/Buttons/MenuButton/MenuButtonContainer'

const MenuData: React.FC<MenuDataPropsType> = (props) => {

    return (
        <ul>
            <li>
                <MenuButton title='Map' src='map' />
            </li>
            <li>
                <MenuButton title='Catalog' src='catalog' />
            </li>
            <li>
                <MenuButton title='Exchange' src='exchange' />
            </li>
            <li>
                <MenuButton title='Currencies' src='currencies' />
            </li>
            <li>
                <MenuButton title='Blog' src='blog' />
            </li>
            <li>
                <MenuButton title='About' src='about-us' />
            </li>
        </ul>
    )
}

export default MenuData

type MenuDataPropsType = {

}