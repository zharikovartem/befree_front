import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginButtonPropsType } from './LoginButtonContainer'
import styled from 'styled-components'
import { Modal } from 'antd'

const Button = styled.div`
    margin-right: 30px;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.1666em;
    color: #2A2929;
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

const ButtonText = styled.div`
    color: black;
`

const LoginButton: React.FC<LoginButtonPropsType> = (props) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onClick = () => {
        props.type === 'modal' && setIsModalOpen(true)
    }

    return (
        <>
            <Button
                onClick={onClick}
            >
                {
                    props.type === 'link' ?
                        <Link to={props.src ? props.src : ''}>
                            <ButtonText>
                                {props.title}
                            </ButtonText>
                        </Link>
                    :  
                        <ButtonText>
                            {props.title}
                        </ButtonText>
                }
                
            </Button>

            {props.type === 'modal' && 
                <Modal title={props.modalProps?.title} visible={isModalOpen} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={null}
                >
                    { props.modalComponent && <props.modalComponent /> }
                </Modal>
            }
        </>
    )
}

export default LoginButton