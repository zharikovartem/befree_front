import { Button, Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { CoordinatesType } from '../../../../Redux/mapReducer';
import { speak, speakByLangs } from '../../../../Utils/Voise/Voise';

const NavigatePanel:React.FC<NavigatePanelPropsType> = (props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isGo, setIsGo] = useState<boolean>(false)

    useEffect(() => {
        props.directions && props.directions.routes && props.directions.routes.length > 0 && setIsOpen(!!props.directions.routes[0])
        console.log('NavigatePanel directions1', props.directions)
        // console.log('NavigatePanel directions2', props.directions.routes.length > 0)
    }, [props.directions, props.directions?.routes]);

    const onGo = () => {
        // alert('onGo')
        props.setCenter({
            lat: props.directions.request.origin.location.lat(),
            lng: props.directions.request.origin.location.lng()
        })
        props.setZoom(19)
        setIsGo(true)

        props.directions && props.directions?.routes[0] && console.log(props.directions.routes[0].legs[0].steps[0])
        console.log(props.directions)

        speakByLangs(props.directions && props.directions?.routes[0] && props.directions.routes[0].legs[0].steps[0].instructions)
    }

    const onCancel = () => {
        console.log('onCancel', {...props.directions})
        const newDirections = {
            ...props.directions,
            routes: []
        }
        console.log('newDirections', {...newDirections})
        props.setDirections(newDirections)
        setIsOpen(false)
        setIsGo(false)
    }

    if (!props.directions || !props.directions.routes || props.directions.routes.length === 0) {
        return <Spin />
    }

    return (
        <div
                style={{
                    position: 'fixed',
                    top: '0%',
                    left: '50%',
                    margin: 'auto',
                    width : 370,
                    // maxWidth: '100%',
                    // height: 75,
                    marginTop: 130,
                    marginLeft: -185,
                    zIndex: 200,
                    backgroundColor: 'white',
                    borderRadius: 10
                }}
                // className='border rounded-10'
                hidden={!isOpen}
            >
                <Row className='m-2'>
                    <Col span={6} className='align-self-center'>
                        {props.directions && props.directions?.routes[0] && props.directions.routes[0].legs[0].duration.text}
                    </Col>
                    <Col span={6} className=' align-self-center'>
                        {props.directions && props.directions?.routes[0] && props.directions.routes[0].legs[0].distance.text}
                    </Col>
                    <Col span={isGo ? 6 : 12} className='align-self-center'>
                        <Button hidden={isGo} onClick={onGo} className='m-2' size='small' type='primary' shape='round'>Driving</Button>
                        <Button onClick={onCancel} className='m-2' size='small' type='primary' danger shape='round'>{isGo ? 'Stop':'Сancel'}</Button>
                    </Col>
                </Row>
                {/* <p hidden={!isGo}>{props.directions && props.directions?.routes[0] && props.directions.routes[0].legs[0].steps[0].instructions}</p> */}
                <div hidden={!isGo} className="Container" dangerouslySetInnerHTML={{
                    __html: props.directions && props.directions?.routes[0] && props.directions.routes[0].legs[0].steps[0].instructions
                }}></div>
            </div>
    )
}

export default  NavigatePanel

type NavigatePanelPropsType = {
    directions: any
    setDirections: React.Dispatch<any>
    setCenter: (coordinates: CoordinatesType) => void
    setZoom: React.Dispatch<React.SetStateAction<number>>
}