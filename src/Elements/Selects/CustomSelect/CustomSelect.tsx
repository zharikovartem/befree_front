import React from 'react'
import styled from 'styled-components'
import { CustomSelectPropsType } from './CustomSelectContainer'

const Select = styled.select`
    margin-right: 30px;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.1666em;
    color: #2A2929;
    backgroundColor: white;
    min-width: 116px;
    min-height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border: 2px solid #6D71F9;
    border-radius: 20px;
    transition: all .2s ease;
    &:hover {
        background-color: #007aff;
    }
`

const CustomSelect:React.FC<CustomSelectPropsType> = (props) => {

    return (
        <Select>
            <option>EN</option>
            <option>RU</option>
        </Select>
    )
}

export default  CustomSelect