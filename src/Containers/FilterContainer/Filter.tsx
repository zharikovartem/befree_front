import React from 'react'
import styled from 'styled-components'
import { FilterPropsType } from './FilterContainer'

const Container = styled.div`
background-color: #6D71F9;
min-heigth: 110;
// padding-top: 66px;
padding-bottom: 20px;
padding-left: 50px;
padding-right: 50px;

// z-index: 2;
`
const FilterFooter = styled.div`
background-color: #6D71F9;
// background-color: red;
height: 2000px;

position: relative;
top: -1980px;
left: -200%;
width: 500%;

border-bottom-left-radius: 1000%;
border-bottom-right-radius: 1000%;

z-index: -1;
`

const FilterButton = styled.div`
    height: 90px;
    width: 90px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #6d71f9;
    border-radius: 50%;
    cursor: pointer;
`

const Filter: React.FC<FilterPropsType> = (props) => {
    console.log('Filter props', props)

    const getFilterBody = () => {
        return props.filter
    }
    return (
        <>
            <Container>
                {/* <FilterContainer></FilterContainer> */}
                {props.filter}
               
            </Container>
            
            <FilterFooter />

            {/* <FilterButton>
                <span>
                    <img src='	https://befree.com/build/site/images/icons/local-turquoise.svg' />
                </span>
            </FilterButton> */}

            {props.children}
        </>
    )
}

export default Filter