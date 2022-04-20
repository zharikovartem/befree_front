import { Button, Col, Divider, Row } from 'antd'
import React, { useEffect } from 'react'
import { url } from './../../../../Api/API'
import { HomeFilled, PhoneFilled, FlagFilled, GlobalOutlined, EditFilled, DownloadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
// import { MapCardPropsType } from './MapCardContainer'

export const СardButtonsBlock = styled.div`
    background-color: #ecebeb;
    padding: 20px;
    border-radius: 10px;
`

const MapCard: React.FC<MapCardPropsType> = (props) => {

    const onCoordinatesCopy = () => {
        console.log('onCoordinatesCopy', props)

    }

    // useEffect(() => {
    //     props.onCoordinatesCopy()
    // }, []);

    // console.log(props)
    // props.foo()

    return (
        <>
            <Row>
                <Col>
                    <img src={url + props.markerData.brandInfo.logoFileName} />
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
                    className='h-50 mr-2'
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
                    data={props.markerData.phoneNumbers[0].number}
                    icon={<PhoneFilled />}
                // data={'???'}
                />
            }

            {props.markerData.brandInfo.link && props.markerData.brandInfo.link !== '#' &&
                <DataRow
                    // label="WWW"
                    data={props.markerData.brandInfo.link}
                    icon={<GlobalOutlined />}
                />
            }

            <Divider
                orientation="left"
                className='my-1'
                plain
            >
                Additional info
            </Divider>
            <DataRow
                // label="WWW"
                data={props.markerData.additionalInformation}
                icon={<EditFilled />}
            />

            <СardButtonsBlock>
                <Button
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
                            src="http://localhost:8080//ico_navi/svg/link.svg" alt=""
                        />
                    }
                    size="large"
                />
                <Button
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
                            src="http://localhost:8080/ico_navi/123/to_map.svg"
                            alt=""
                        />
                    } 
                    size="large" 
                />
                <Button className='mx-3' type="primary" shape="circle" icon={<img src="http://localhost:8080/ico_navi/123/to_map.svg" alt="" />} size="large" />
                <Button className='mx-3' type="default" shape="circle" icon={<img src="http://localhost:8080/ico_navi/svg/navi.svg" alt="" />} size="large" />
            </СardButtonsBlock>
        </>
            )
}

            export default MapCard

            type MapCardPropsType = {
                markerData: any
}


            type DataRowType = {
                label ?: string
    data: string
            icon?: JSX.Element
}

            export const DataRow: React.FC<DataRowType> = (props) => {
    return (
                <Row className='mx-4 my-1'>
                    <Col span={2}>
                        {props.icon && props.icon}
                    </Col >
                    <Col span={20}>
                        {props.label && props.label + ': '} {props.data}
                    </Col>
                </Row>
                )
}