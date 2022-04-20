import React from 'react'
import styled from 'styled-components'
import { GreenButtonPropsType } from './GreenButtonContainer'

const Button = styled.button`
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.1em;
    text-transform: uppercase;
    color: #6d71f9;
    min-width: 134px;
    height: 60px;
    background: linear-gradient(180deg,#5cdeda,#62c0ff);
    border-radius: 30px!important;
    padding: 4px;
    overflow: hidden;
    align-self: normal;
    position: relative;
    transition: all .2s ease;

    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;

    width: 100%;
`

const Span = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #5CDEDA 0%, #2FFF6A 100%);
    border-radius: 30px !important;
    height: 100%;
    width: 100%;
    transition: all .2s ease;
    padding: 10px 15px;

    &:before {
        position: absolute;
        content: '';
        top: 0;
        left: -60px;
        width: 50px;
        height: 100%;
        transition: all .5s ease;
        background-color: rgba(#fff, 0.4);
        transform: skew(15deg);
    }
`
const GreenButton:React.FC<GreenButtonPropsType> = (props) => {

    return (
        <Button>
            <Span>
                {props.value}
            </Span>
        </Button>
    )
}

export default  GreenButton