import React, { useEffect } from 'react'
import { BrandsCategoryFormPropsType } from './BrandsCategoryFormContainer'
import './BrandsCategoryForm.css'
import { Button, Col, Row } from 'antd'
import { url } from '../../../../Api/API'
import { DataRow, СardButtonsBlock } from './../../GoogleMapsReact/MapCard/MapCard'
import { HomeFilled } from '@ant-design/icons'


const BrandsCategoryForm: React.FC<BrandsCategoryFormPropsType> = (props) => {

    useEffect(() => {
        console.log('useEffect')
    }, []);

    return (
        <div>
            {props.brendObjectMenuList.map(brendObject => {
                console.log(brendObject)
                return (
                    <div className='m-2 border'>
                        <Row className='m-2'>
                            <Col span={8}>
                                <img src={url + brendObject.brandInfo.logoFileName} alt="" />
                            </Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={22}>
                                        <h5>{brendObject.brandInfo.title}</h5>
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

                        <button onClick={()=>{
                                console.log('!!!!!!!!!!')
                            }}>123</button>

                        <СardButtonsBlock className='m-3'>
                            <Button onClick={()=>{
                                console.log('!!!!!!!!!!')
                            }} className='mx-2' type="dashed" shape="circle" icon={<img src="http://localhost:8080//ico_navi/svg/link.svg" alt="" />} size="large" />
                            <Button className='mx-2' type="ghost" shape="circle" icon={<img src="http://localhost:8080/ico_navi/123/to_map.svg" alt="" />} size="large" />
                            <Button className='mx-2' type="primary" shape="circle" icon={<img src="http://localhost:8080/ico_navi/123/to_map.svg" alt="" />} size="large" />
                            <Button className='mx-2' type="default" shape="circle" icon={<img src="http://localhost:8080/ico_navi/svg/navi.svg" alt="" />} size="large" />
                        </СardButtonsBlock>
                    </div>
                )
            })}
        </div>
    )
}

export default BrandsCategoryForm