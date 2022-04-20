import React from 'react'
import Header from '../../Components/Header/HeaderContainer'
import { MainPropsType } from './MainContainer'

const Main:React.FC<MainPropsType> = (props) => {

    return (
        <>
            <Header />
            <main style={{ 
                paddingTop: "64px",
                height: "100px"
            }}>
                {props.children }
            </main>
        </>
    )
}

export default  Main