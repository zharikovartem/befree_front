import { HomeFilled } from '@ant-design/icons'
import { Button, Row } from 'antd'
import React from 'react'
import { url } from '../../../../Api/API'
import { AtmType } from '../../../../Redux/brendObjectReducer'
import { DataRow } from '../../GoogleMapsReact/MapCard/MapCard'
import { AtmFormPropsType } from './AtmFormContainer'
import –°ardButtonsBlock from './../../../../Blocks/–°ardButtonsBlock/–°ardButtonsBlock'

const AtmForm: React.FC<AtmFormPropsType> = (props) => {

    console.log('AtmForm props', props)

    const onGetGoogleLink = (brendObject: AtmType) => {
        console.log('onGetGoogleLink')
        navigator.clipboard.writeText('http://maps.google.com/?ie=UTF8&hq=&ll='+brendObject.address.latitude+','+brendObject.address.longitude+'&z=17')
        props.addSuccess('Data successfully copied to clipboard')
    }

    const onNavi = (atm: AtmType) => {

        const start = new google.maps.LatLng(props.myCoords.lat, props.myCoords.lng)
        const stop = new google.maps.LatLng(atm.address.latitude, atm.address.longitude)

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
                props.onClose()
            } else {
                props.addError('You can not build this route')
            }
        })
    }

    const onImageClick = (atm: any) => {
        console.log(atm.address.latitude)
        console.log(atm.address.longitude)
        props.setCenter(
            {
                lat:parseFloat(atm.address.latitude),
                lng:parseFloat(atm.address.longitude),
            }, 
            {
                type: 'atm',
                id: atm.id
            }
        )
        props.onClose()
    }


    return (
        <>
            {props.atmMenuList.map(atm => {
                return (
                    <div className='m-2 border'>
                        <Row className='m-2'>
                            {/* <h5 className="text-center">
                                {atm.title}
                            </h5> */}
                            <Button type="text" onClick={()=>onImageClick(atm)}>
                                <h5>{atm.title}</h5>
                            </Button>
                        </Row>

                        {!atm.address && console.log('!!!', atm.address)}

                        {
                            atm.address && //console.log('!!!') &&
                            <DataRow
                                data={atm.address.data}
                                icon={<HomeFilled />}
                            />
                        }

                        <–°ardButtonsBlock 
                            onGetGoogleLink={onGetGoogleLink}
                            onNavi={onNavi}
                            target={atm}
                        />

                        {/* <–°ardButtonsBlock className='m-3'>
                            <Button onClick={() => {
                                onGetGoogleLink(atm)
                            }} className='mx-2' type="dashed" shape="circle" icon={<img src={url + "ico_navi/svg/link.svg"} alt="" />} size="large" />
                            <Button
                                onClick={() => { onNavi(atm) }}
                                className='mx-2' type="ghost" shape="circle" icon={<img src={url + "ico_navi/123/to_map.svg"} alt="" />} size="large" /> */}
                            {/* <Button className='mx-2' type="primary" shape="circle" icon={<img src={url+"ico_navi/123/to_map.svg"} alt="" />} size="large" /> */}
                            {/* <Button className='mx-2' type="default" shape="circle" icon={<img src={url+"ico_navi/svg/navi.svg"} alt="" />} size="large" /> */}
                        {/* </–°ardButtonsBlock> */}

                    </div>
                )
            })}
        </>
    )
}

export default AtmForm