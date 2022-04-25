import React, { useEffect } from 'react'
import { BrandsCategoryFormPropsType } from './BrandsCategoryFormContainer'
import './BrandsCategoryForm.css'
import { Button, Col, Row } from 'antd'
import { url } from '../../../../Api/API'
import { DataRow, СardButtonsBlock } from './../../GoogleMapsReact/MapCard/MapCard'
import { HomeFilled } from '@ant-design/icons'


const BrandsCategoryForm: React.FC<BrandsCategoryFormPropsType> = (props) => {

    console.log('BrandsCategoryForm', props);
    
    useEffect(() => {
        console.log('useEffect')
    }, []);

    const onImageClick = (brendObject: any) => {
        console.log(brendObject.address.latitude)
        console.log(brendObject.address.longitude)
        props.setCenter({
            lat:parseFloat(brendObject.address.latitude),
            lng:parseFloat(brendObject.address.longitude),
        })
        props.onClose()
    }

    const onGetGoogleLink = (brendObject: any) => {
        console.log('onGetGoogleLink')
        navigator.clipboard.writeText('http://maps.google.com/?ie=UTF8&hq=&ll='+brendObject.address.latitude+','+brendObject.address.longitude+'&z=17')
        props.addSuccess('Data successfully copied to clipboard')
    }

    const onRouting = (brendObject: any) => {
        props.setRoute({
            lat:parseFloat(brendObject.address.latitude),
            lng:parseFloat(brendObject.address.longitude),
        })
    }

    const onNavi = (brendObject: any) => {
        // console.log('onNavi', props.directionsService);

        const start = new google.maps.LatLng(props.myCoords.lat, props.myCoords.lng)
        const stop = new google.maps.LatLng(brendObject.address.latitude, brendObject.address.longitude)

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
                props.onClose()
            } else {
                props.addError('You can not build this route')
            }
        })
    }

    return (
        <div>
            {props.brendObjectMenuList.map(brendObject => {
                console.log(brendObject)
                return (
                    <div className='m-2 border'>
                        <Row className='m-2'>
                            <Col onClick={()=>{onImageClick(brendObject)}} span={8}>
                                {brendObject.brandInfo.logoFileName ?
                                    <img style={{width: '100%', height: 'auto'}} src={url + brendObject.brandInfo.logoFileName} alt="" />
                                    : 
                                    <img style={{width: '100%', height: 'auto'}} src={url + '/build/site/images/logo/logo.svg'} alt="" />
                                }
                                
                            </Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={22}>
                                        <h5 className="text-center">{brendObject.brandInfo.title}</h5>
                                    </Col>
                                    <Col span={2}>
                                        <Row>

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.00173 8.47298C2.98357 9.2487 3.10839 10.0202 3.36835 10.739C3.36835 10.739 3.8438 12 4.5 12.6562L12.0083 21L19.5044 12.6562C19.9951 12.1141 20.381 11.464 20.638 10.7465C20.895 10.0289 21.0175 9.25947 20.998 8.48622C20.9784 7.71297 20.8172 6.95258 20.5243 6.25264C20.2315 5.55271 19.8134 4.92829 19.2961 4.41848C18.7788 3.90867 18.1736 3.52443 17.5182 3.28982C16.8629 3.0552 16.1715 2.97527 15.4875 3.055C14.8034 3.13474 14.1413 3.37244 13.5426 3.75323C12.944 4.13401 12.4216 4.64968 12.0083 5.26797C11.5968 4.64516 11.0751 4.12494 10.476 3.74008C9.87693 3.35521 9.21351 3.11402 8.5275 3.03171C7.84149 2.9494 7.14776 3.02775 6.49 3.26181C5.83223 3.49588 5.22468 3.8806 4.7056 4.39174C4.18652 4.90289 3.76715 5.52939 3.47391 6.23178C3.18067 6.93418 3.0199 7.69727 3.00173 8.47298Z" stroke="#B8B9D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>

                                        </Row>
                                        <Row>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.5 14.5L4 20" stroke="#B8B9D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M20.5 9.5L15 15V18L14 19L5 10V9H9L14.5 3.5" stroke="#B8B9D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M14 3L21 10" stroke="#B8B9D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='m-2'>
                            <Col span={12}>Currencies</Col>
                            <Col span={12}>Stars</Col>
                        </Row>

                        <DataRow 
                            data={brendObject.address.data}
                            icon={<HomeFilled/>}
                        />

                        <СardButtonsBlock className='m-3'>
                            <Button onClick={()=>{
                                onGetGoogleLink(brendObject)
                            }} className='mx-2' type="dashed" shape="circle" icon={<img src={url+"ico_navi/svg/link.svg"} alt="" />} size="large" />
                            <Button 
                                onClick={()=>{onNavi(brendObject)}}
                                className='mx-2' type="ghost" shape="circle" icon={<img src={url+"ico_navi/123/to_map.svg"} alt="" />} size="large" />
                            <Button className='mx-2' type="primary" shape="circle" icon={<img src={url+"ico_navi/123/to_map.svg"} alt="" />} size="large" />
                            <Button className='mx-2' type="default" shape="circle" icon={<img src={url+"ico_navi/svg/navi.svg"} alt="" />} size="large" />
                        </СardButtonsBlock>
                    </div>
                )
            })}
        </div>
    )
}

export default BrandsCategoryForm