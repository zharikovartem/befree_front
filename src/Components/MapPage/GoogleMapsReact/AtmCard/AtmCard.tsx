import { HomeFilled } from '@ant-design/icons'
import { Button, Row } from 'antd'
import React from 'react'
import { url } from '../../../../Api/API'
import { DataRow, MapCardPropsType } from '../MapCard/MapCard'
import СardButtonsBlock from './../../../../Blocks/СardButtonsBlock/СardButtonsBlock'

type AtmCardPropsType = {
    onGetGoogleLink: () => void
    onNavi: () => void
}

const AtmCard:React.FC<MapCardPropsType & AtmCardPropsType> = (props) => {

    console.log('AtmCard props', props)

    return (
        <>
            <Row>
                <h5>{props.atmData?.title}</h5>
                {/* <Button type="text" onClick={()=>console.log('!!!')}>
                    <h5>{props.atmData?.title}</h5>
                </Button> */}
            </Row>

            {props.atmData?.address &&<DataRow label="" data={props.atmData?.address.data}
                icon={<HomeFilled />}
            />}

            <СardButtonsBlock 
                onGetGoogleLink={props.onGetGoogleLink}
                onNavi={props.onNavi}
                target={props.atmData}
            />

            {/* <СardButtonsBlock>
                <Button
                    onClick={props.onGetGoogleLink}
                    className='mx-3 onCoordinatesCopy'
                    // @ts-ignore
                    myid={props.atmData.id}
                    type="dashed"
                    shape="circle"
                    icon={
                        <img
                            // @ts-ignore
                            myid={props.atmData.id}
                            className='onCoordinatesCopy'
                            src={url + "ico_navi/svg/link.svg"} alt=""
                        />
                    }
                    size="large"
                />
                <Button
                    onClick={props.onNavi}
                    className='mx-3 viewDistance'
                    // @ts-ignore
                    myid={props.atmData.id}
                    type="ghost"
                    shape="circle"
                    icon={
                        <img
                            // @ts-ignore
                            myid={props.atmData.id}
                            className='viewDistance'
                            src={url + "ico_navi/123/to_map.svg"}
                            alt=""
                        />
                    }
                    size="large"
                /> */}
                {/* <Button className='mx-3' type="primary" shape="circle" icon={<img src={url + "ico_navi/123/to_map.svg"} alt="" />} size="large" /> */}
                {/* <Button onClick={onNavi} className='mx-3' type="default" shape="circle" icon={<img src={url + "ico_navi/svg/navi.svg"} alt="" />} size="large" /> */}
            {/* </СardButtonsBlock> */}
        </>
    )
}

export default  AtmCard