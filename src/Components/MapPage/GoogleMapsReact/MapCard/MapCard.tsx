import { Button, Col, Divider, Row } from 'antd'
import React, { useEffect } from 'react'
import { url } from './../../../../Api/API'
import { HomeFilled, PhoneFilled, FlagFilled, GlobalOutlined, EditFilled, DownloadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { calculateRoute } from '../../../../Redux/mapReducer'
import { useDispatch } from 'react-redux'
import { addSuccess } from '../../../../Redux/messageReducer'
// import { MapCardPropsType } from './MapCardContainer'

export const СardButtonsBlock = styled.div`
    background-color: #ecebeb;
    padding: 20px;
    border-radius: 10px;
`



const MapCard: React.FC<MapCardPropsType> = (props) => {

    // const dispatch = useDispatch()

    const onNavi = () => {
        console.log('onNavi', props.directionsService);

        const start = new google.maps.LatLng(props.myCoords.lat, props.myCoords.lng)
        const stop = new google.maps.LatLng(props.markerData.address.latitude, props.markerData.address.longitude)

        // props.calculateRoute(start, stop, props.directionsService)
        // const func = calculateRoute(start, stop, props.directionsService)
        
        // const directionsService = new props.directionsService.maps.DirectionsService()
        const DirectionsService = new google.maps.DirectionsService();      
        DirectionsService.route({
            origin: start,
            destination: stop,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus)=>{
            console.log('calculateRoute result', result)
            console.log('calculateRoute status', status)
            if(status === 'OK') {
                props.getRoutes(result)
            } else {
                props.addError('You can not build this route')
            }
        })
    }

    const onGetGoogleLink = () => {
        console.log('onGetGoogleLink')
        navigator.clipboard.writeText('http://maps.google.com/?ie=UTF8&hq=&ll='+props.markerData.address.latitude+','+props.markerData.address.longitude+'&z=17')
        props.addSuccess('Data successfully copied to clipboard')
    }

    return (
        <>
            <Row>
                <Col>
                    {props.markerData.brandInfo.logoFileName &&
                        <img
                            style={{
                                height: 70
                            }}
                            src={url + props.markerData.brandInfo.logoFileName}
                            alt=""
                        />
                    }
                </Col>
                <Col>
                    <h5>{props.markerData.brandInfo.title}</h5>
                </Col>
            </Row>

            <Divider
                orientation="left"
                className='my-1'
                plain
            >
                Descriptions
            </Divider>
            <DataRow label="Category" data={props.markerData.brandInfo.category.title}
                // icon={props.markerData.brandInfo.category.logoFileName}
                icon={<img
                    style={{ height: 13 }}
                    className='mr-2'
                    src={url + props.markerData.brandInfo.category.logoFileName}
                />}
            />
            <DataRow label="" data={props.markerData.address.data}
                icon={<HomeFilled />}
            />
            {props.markerData.address.state &&
                <DataRow
                    // label="State" 
                    data={props.markerData.address.state + ', ' + props.markerData.address.country}
                    icon={<FlagFilled />}
                />
            }

            {/* {props.markerData.phoneNumbers.length > 0 || props.markerData.brandInfo.link && props.markerData.brandInfo.link !== '#'} */}
            <Divider
                orientation="left"
                className='my-1'
                plain
            >
                Contacts
            </Divider>
            {props.markerData.phoneNumbers.length > 0 &&
                <DataRow label="Phone"
                    // data={props.markerData.phoneNumbers[0].number}
                    data={<a href={'tel:'+props.markerData.phoneNumbers[0].number}>{props.markerData.phoneNumbers[0].number}</a>}
                    icon={<PhoneFilled />}
                // data={'???'}
                />
            }

            {props.markerData.brandInfo.link && props.markerData.brandInfo.link !== '#' &&
                <DataRow
                    data={<a target='_blank' href={props.markerData.brandInfo.link}>{props.markerData.brandInfo.link}</a>}
                    icon={<GlobalOutlined />}
                />
            }

            {props.markerData.additionalInformation &&
            <Divider
                orientation="left"
                className='my-1'
                plain
            >
                Additional info
            </Divider>
            &&
            <DataRow
                // label="WWW"
                data={props.markerData.additionalInformation}
                icon={<EditFilled />}
            />
            }

            <СardButtonsBlock>
                <Button
                    onClick={onGetGoogleLink}
                    className='mx-3 onCoordinatesCopy'
                    // @ts-ignore
                    myid={props.markerData.id}
                    type="dashed"
                    shape="circle"
                    icon={
                        <img
                            // @ts-ignore
                            myid={props.markerData.id}
                            className='onCoordinatesCopy'
                            src={url + "ico_navi/svg/link.svg"} alt=""
                        />
                    }
                    size="large"
                />
                <Button
                    onClick={onNavi}
                    className='mx-3 viewDistance'
                    // @ts-ignore
                    myid={props.markerData.id}
                    type="ghost"
                    shape="circle"
                    icon={
                        <img
                            // @ts-ignore
                            myid={props.markerData.id}
                            className='viewDistance'
                            src={url + "ico_navi/123/to_map.svg"}
                            alt=""
                        />
                    }
                    size="large"
                />
                {/* <Button className='mx-3' type="primary" shape="circle" icon={<img src={url + "ico_navi/123/to_map.svg"} alt="" />} size="large" /> */}
                {/* <Button onClick={onNavi} className='mx-3' type="default" shape="circle" icon={<img src={url + "ico_navi/svg/navi.svg"} alt="" />} size="large" /> */}
            </СardButtonsBlock>
        </>
    )
}

export default MapCard

type MapCardPropsType = {
    markerData: any
    directionsService: any
    getRoutes: (routesResp: any) => void
    myCoords: any

    addSuccess: (error: string) => void
    addError: (error: string) => void
}


type DataRowType = {
    label?: string
    data: string | JSX.Element
    icon?: JSX.Element
}

export const DataRow: React.FC<DataRowType> = (props) => {
    return (
        <Row className='mx-4 my-1'>
            <Col span={2}>
                {props.icon && props.icon}
            </Col >
            <Col span={20}>
                {props.label && props.label + ': '} {typeof props.data === 'string' ? props.data.replace(/<[^>]+>/g, '') : props.data}
            </Col>
        </Row>
    )
}