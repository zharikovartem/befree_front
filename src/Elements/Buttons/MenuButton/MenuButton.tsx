import React from 'react'
import { Link } from 'react-router-dom'
import { MenuButtonPropsType } from './MenuButtonContainer'
import styled from 'styled-components'

const Button = styled.div`
    margin-right: 10px;
`
const MenuButton: React.FC<MenuButtonPropsType> = (props) => {

    return (
        <Button>
            <Link to={props.src}>
                <div>
                    {props.title}
                </div>
            </Link>
        </Button>
    )
}

export default MenuButton