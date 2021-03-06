import React, { useEffect, useState } from 'react'
import MapMenu from './MapMenu/MapMenuContainer'
import GoogleMap from './GoogleMapsReact/GoogleMap'
import { Col, Row } from 'antd'
import MapMenuDrower from './MapMenu/MapMenuDrower/MapMenuDrower'
import { MapPagePropsType } from './MapPageContainer'

const MapPage: React.FC<MapPagePropsType> = (props) => {

    const [myCoords, setMyCoords] = useState<google.maps.LatLngLiteral>()
    const [routes, setRoutes] = useState<any>()
    const [isDrawerVisible, setIsDrawerVisible] = useState<false | string>(false)

    const [markers, setMarkers] = useState<any[]>(props.markers)

    useEffect(() => {
        console.log('routes is changed', routes)
    }, [routes]);

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
        if (!navigator.geolocation) {
            setMyCoords({
                lat: 53.9416502,
                lng: 27.686863
            })
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position.coords &&
                    position.coords.latitude &&
                    position.coords.longitude
                ) {
                    setMyCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                } else {
                    setMyCoords({
                        lat: 53.9416502,
                        lng: 27.686863
                    })
                }
                
            }, () => { });
        }
    }

    const getRoutes = (routesResp: any) => {
        console.log('getRoutes', routesResp)
        // setRoutes(routesResp)
        if (routes) {
            const newRounes = {
                ...routes,
                routes: routesResp.routes
            }
            console.log('newRounes', newRounes)
            console.log('newRounes', newRounes)
            setRoutes(newRounes)
        } else {
            console.log('init newRounes', routesResp)
            setRoutes(routesResp)
        }
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
            console.log('myCoords !!!', myCoords)
    
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
                <GoogleMap
                    // @ts-ignore
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI&libraries=places"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `93vh` }} />}
                    mapElement={<div style={{ height: `100%`, width: `100%`, position: `inherit` }} />}
                    ////////////////////////////////////////////////////
                    pathCoordinates={routes} // ????????????????
                    // myCoords={myCoords} // ?????? ???????????????????? ?????? ??????????????
                    myCoords={{
                        lat: 40.7222034,
                        lng: -74.0475331
                    }}
                    // calculateRoute={props.calculateRoute}
                    getBrendObjectsByBounds={props.getBrendObjectsByBounds}

                    markersBrand={props.markers}
                    markersAtm={props.atmList}
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

export default MapPage

type ComponentNamePropsType = {

}