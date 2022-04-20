import React from 'react'
import styled from 'styled-components';
import { SearchInputPropsType } from './SearchInputContainer'

const Input = styled.input`
    border-radius: 30px!important;
    display: flex;
    align-items: center;
    min-height: 60px;
    outline: none;
    border: 1px solid transparent;
    padding: 10px 30px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.1em;
    color: inherit;
    transition: all .2s ease;
    margin-right: 20px;

    box-shadow: -12px 3px 24px #7d82ff, 12px 12px 24px #5d60d4;
    background: hsla(0,0%,100%,.1);

    width: 90%;
    margin-rigth: 20px;
    margin-left: 20px;
`;

const SearchInput:React.FC<SearchInputPropsType> = (props) => {
    console.log('SearchInput props', props)
    return (
        <Input 
            type='text'
            placeholder={props.placeholder && props.placeholder}
        />
    )
}

export default  SearchInput