import { Drawer, DrawerProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { loadMapApi } from '../../Utils/GoogleMapUtils'
import GoogleMapPage from './GoogleMap/GoogleMapPageContainer'
import MapMenu from './MapMenu/MapMenuContainer'
import { MapPagePropsType } from './MapPageContainer'
import './MapPage.css'
import AllBrandsForm from './MapMenu/AllBrandsForm/AllBrandsFormContainer'
import GoogleMapsReact from './GoogleMapsReact/GoogleMapsReactContainer'
import BrandsCategoryForm from './MapMenu/BrandsCategoryForm/BrandsCategoryFormContainer'
import { CloseOutlined } from '@ant-design/icons'

import Map from "./GoogleMapsReact/TestMap";

const api = "AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI";

const MapPage: React.FC<MapPagePropsType> = (props) => {

    const [visible, setVisible] = useState<boolean>(false)
    const [draverIndex, setdraverIndex] = useState<string>()
    const [size, setSize] = useState<DrawerProps['size']>('large');

    const [myCoords, setMyCoords] = useState<google.maps.LatLngLiteral>()

    useEffect(() => {
        getLocation()
    }, []);

    const getLocation = () => {
        if (!navigator.geolocation) { } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }, () => { });
        }
    }

    const showDrawer = (ev: any) => {
        setdraverIndex(ev.key)
        setVisible(!visible);

        const categoryId = ev.key.split('2-')[1]
        let category: number[] = []
        categoryId && category.push(parseInt(categoryId))

        console.log('myCoords MapPage', myCoords)

        myCoords && props.getNearestBrendObjects({
            lat: myCoords.lat,
            lng: myCoords.lng,
            category: category,
            isAtm: ev.key === '3'
        })
    }

    const onClose = () => {
        setVisible(false);
    }

    console.log('myCoords', myCoords)

    const renderMap = () => {
        console.log('renderMap1')
        if (myCoords) {
            console.log('renderMap2')
            return (<GoogleMapsReact initialCenter={myCoords} />)
        }
        return <></>
    }

    return (
        <>
            <div
                className='d-flex'
            >

                <MapMenu
                    showDrawer={showDrawer}
                />

                <div>
                    <Drawer
                        // size={size}
                        width={400}
                        // title="Basic Drawer"
                        title={<CloseOutlined onClick={onClose} />}
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        {draverIndex?.split('2-')[1] && 
                            <BrandsCategoryForm 
                                setCenter={()=>{}}
                                onClose={()=>{}}
                                setRoute={()=>{}}
                                myCoords={{
                                    lat: 0,
                                    lng: 0
                                }}
                                getRoutes={()=>{}}
                            />
                        }
                        {draverIndex === '1' &&
                            <AllBrandsForm 
                                onReload={()=>{}}
                            />
                        }
                    </Drawer>

                    {renderMap()}

                </div>
            </div>
        </>
    )
}

export default MapPage