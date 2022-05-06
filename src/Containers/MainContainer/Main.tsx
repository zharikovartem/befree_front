import React, { useEffect } from 'react'
import Header from '../../Components/Header/HeaderContainer'
import { MainPropsType } from './MainContainer'
import { message, Button, Space } from 'antd'
import { refreshToken } from '../../Api/API'

const Main:React.FC<MainPropsType> = (props) => {

    useEffect(() => {
        props.success[0] && success(props.success[0])
    }, [props.success]);

    useEffect(() => {
        props.error[0] && error(props.error[0])
    }, [props.error]);

    useEffect(() => {
        console.log('Main useEffect props.isAuth', props.isAuth)
        !props.isAuth && localStorage.removeItem('apikey') 
        refreshToken()
    }, [props.isAuth]);

    const success = (value: string) => {
        console.log('success: ', value)
        message.success({
            content: value,
            // className: 'custom-class',
            style: {
                marginTop: '20vh',
                zIndex: 1000
            },
        });
    }

    const error = (value: string) => {
        message.error({
            content: value,
            // className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    }

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