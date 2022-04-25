import React, { useEffect, useState } from 'react'
import MapMenu from './MapMenu/MapMenuContainer'
import TestMap from '../MapPage/GoogleMapsReact/TestMap'
import { Col, Row } from 'antd'
import MapMenuDrower from './GoogleMapsReact/MapMenuDrower/MapMenuDrower'
import { TestMapPagePropsType } from './TestMapPageContainer'

const TestMapPage: React.FC<TestMapPagePropsType> = (props) => {

    const [myCoords, setMyCoords] = useState<google.maps.LatLngLiteral>()
    const [routes, setRoutes] = useState<any>()
    const [isDrawerVisible, setIsDrawerVisible] = useState<false | string>(false)

    const [markers, setMarkers] = useState<any[]>(props.markers)

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        console.log('console.log(params);', props)
    }, [props]);

    // useEffect(() => {
    //     let newMarkers: any[] = props.markers.filter( (item) => {
    //         console.log(item)
    //         const id = item.brandInfo.category.id
    //         console.log(id)
    //         console.log('props.categoryFilter', props.categoryFilter)
    //         if (props.categoryFilter.length === 0) {
    //             return item
    //         }
    //         console.log('props.categoryFilter.includes(id)', props.categoryFilter.includes(id))
    //         if (props.categoryFilter.includes(id)) {
    //             return item
    //         }
    //     })

    //     console.log('newMarkers', newMarkers)

    //     setMarkers(newMarkers)

    // }, [props.categoryFilter, props.markers]);

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

    const getRoutes = (routesResp: any) => {
        console.log('getRoutes', routesResp)
        setRoutes(routesResp)
    }

    const showDrawer = (ev: any) => {
        // setNeedToCloseAll(true)
        if (isDrawerVisible) {
            setIsDrawerVisible(false)
        } else {
            console.log('showDrawer', ev.key)
            setIsDrawerVisible(ev.key)
    
            const categoryId = ev.key.split('2-')[1]
            let category: number[] = []
            categoryId && category.push(parseInt(categoryId))
    
            // alert(ev.key)
    
            myCoords && props.getNearestBrendObjects({
                lat: myCoords.lat,
                lng: myCoords.lng,
                category: category,
                isAtm: ev.key === '3'
            })
        }
        // setNeedToCloseAll(false)
    }


    const getDawerVisible = (isDrawerVisible: false | string) => {
        setIsDrawerVisible(isDrawerVisible)
    }

    const clearDirections = () => {
        console.log('clearDirections')
        // props.clearRoutes()
        getRoutes(undefined)
    }

    return (
        <>
            <div className='d-flex'>
                <MapMenu showDrawer={showDrawer} />
                <div className='flex-grow-1 site-drawer-render-in-current-wrapper h-100'>
                {/* <MapMenuDrower /> */}
                <TestMap
                    // @ts-ignore
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI&libraries=places"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `93vh` }} />}
                    mapElement={<div style={{ height: `100%`, width: `100%`, position: `inherit` }} />}
                    ////////////////////////////////////////////////////
                    pathCoordinates={routes} // Маршруты
                    // myCoords={myCoords} // Мои координвты для маркеры
                    myCoords={{
                        lat: 40.7222034,
                        lng: -74.0475331
                    }}
                    // calculateRoute={props.calculateRoute}
                    getBrendObjectsByBounds={props.getBrendObjectsByBounds}

                    markersBrand={props.markers}
                    // markersBrand={markers}

                    getRoutes={getRoutes}
                    isDrawerVisible={isDrawerVisible}
                    getDawerVisible={getDawerVisible}
                    addSuccess={props.addSuccess}
                    addError={props.addError}
                    // needToCloseAll={needToCloseAll}
                    clearDirections={clearDirections}

                    newCenter={()=>alert('newCenter')}
                    categoryFilter={props.categoryFilter}
                />
                </div>
            </div>
        </>
    )
}

export default TestMapPage

type ComponentNamePropsType = {

}