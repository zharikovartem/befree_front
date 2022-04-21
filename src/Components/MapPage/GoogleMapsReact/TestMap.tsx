import React, { Component, ReactNode, useEffect, useState } from "react";
import { compose, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker,
    InfoWindow
} from "react-google-maps";


import { GoogleMap as GoogleMapApi, useJsApiLoader } from '@react-google-maps/api'
import MapMenu from "../MapMenu/MapMenuContainer";
import { Col, Drawer, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MapMenuDrower from "./MapMenuDrower/MapMenuDrower";
import { IMapProps, IMarkerProps } from "google-maps-react";
import { url } from "../../../Api/API";
import MapCard from "./MapCard/MapCard";

/*global google*/

const MapWithADirectionsRenderer = compose(
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                // @ts-ignore
                onMapMounted: ref => {
                    // @ts-ignore
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    console.log('onBoundsChanged', this.props);

                    this.setState({
                        // @ts-ignore
                        bounds: refs.map.getBounds(),
                        // @ts-ignore
                        center: refs.map.getCenter(),
                    })

                    // @ts-ignore
                    const bounds: google.maps.LatLngBounds | null | undefined = refs.map.getBounds()
                   

                    setTimeout(() => {
                         // @ts-ignore
                        this.props.getBrendObjectsByBounds({
                            lngMin: bounds ? bounds.getSouthWest().lng() : 0,
                            lngMax: bounds ? bounds.getNorthEast().lng() : 0,
                            latMin: bounds ? bounds.getSouthWest().lat() : 0,
                            latMax: bounds ? bounds.getNorthEast().lat() : 0
                        })
                    }, 100);
                    
                },
                // @ts-ignore
                onSearchBoxMounted: ref => {
                    // @ts-ignore
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    // @ts-ignore
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    // @ts-ignore
                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    // @ts-ignore
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    // @ts-ignore
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },

        componentWillUpdate() {
            console.log('componentWillUpdate');
        },

        componentDidUpdate() {
            

            

            // @ts-ignore
            if (this.props.pathCoordinates && !this.state.tryRoute) {
                console.log('componentDidUpdate', this.props);
                this.setState({
                    tryRoute: true,
                    // @ts-ignore
                    directions: this.props.pathCoordinates
                });
            }
        }
    })
)((props: any) => {


    const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false)
    const [activeBrendObject, setActiveBrendObject] = useState<any>()
    const [center, setCenter] = useState<any>(props.myCoords)

    const [waitForShowing, setWaitForShowing] = useState<boolean>(false)

    useEffect(() => {
        console.log('useEffect', props.markersBrand)
        waitForShowing && setShowingInfoWindow(true) && alert('ok')
        setWaitForShowing(false)
    }, [props.markersBrand]);
    

    // const map2 = useGoogleMap()

    const clickOmMe = () => {
        alert('You\'re here')
    }

    const onMapBoundsChanged = () => {
        console.log('onMapBoundsChanged', props.bounds);
        props.onBoundsChanged()
    }

    const onMarkerClick = (id: number) => {
        const targetBrendObject = props.markersBrand.filter((brandObject: any) => brandObject.id === id)[0]
        if (targetBrendObject) {
            const newCenter = {
                lat: parseFloat(targetBrendObject.address.latitude),
                lng: parseFloat(targetBrendObject.address.longitude),
            }
            console.log('newCenter', newCenter)

            setCenter(newCenter)
            
            setActiveBrendObject(targetBrendObject)
            setWaitForShowing(true)
        }
    }

    const setShowingInfoWindowTimeout = (data: boolean) => {
        setShowingInfoWindow(data)
    }

    const onInfoWindowClose = () => {
        setShowingInfoWindow(false)
    }

    const onDomReady = () => {
        // const targ =  document.querySelector('.wtf')?.parentElement;
        // if (targ) { 
        //     console.log(targ)
        //     targ.hidden = true
        // }
    }

    const getRoutes = (routesResp: any) => {
        setShowingInfoWindow(false)
        props.getRoutes(routesResp)
    }

    return <>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={props.myCoords}
            center={center}
            // onZoomChanged={onZoomChanged}
            // @ts-ignore
            onBoundsChanged={onMapBoundsChanged}
            // ref={mapRef}

            ref={props.onMapMounted}
        >
            <MapMenuDrower 
                isDrawerVisible={props.isDrawerVisible}
                getDawerVisible={props.getDawerVisible}
            />

            <>
                <Marker
                    onClick={clickOmMe}
                    label={{ text: 'You\'re here' }}
                    position={props.myCoords}
                />

                {props.markersBrand.map((brandObject: any) => {
                    console.log('brandObject', brandObject)
                    console.log('latitude', brandObject.address.latitude)
                    // const position = {

                    // }
                    return (
                        <Marker
                            onClick={() => { onMarkerClick(brandObject.id) }}
                            icon={{
                                url: url + brandObject.brandInfo.category.markerFileName,
                                scaledSize: new google.maps.Size(45, 50),
                            }}
                            position={{
                                lat: parseFloat(brandObject.address.latitude),
                                lng: parseFloat(brandObject.address.longitude)
                            }}
                        />
                    )
                })}

                {
                    props.directions &&// console.log('!!!!!!!!', props.directions) &&
                    <DirectionsRenderer
                        directions={props.directions}
                    />
                }

                {showingInfoWindow &&
                        <InfoWindow
                            position={{
                                lat: parseFloat(activeBrendObject.address.latitude),
                                lng: parseFloat(activeBrendObject.address.longitude)
                            }}
                            onCloseClick={onInfoWindowClose}
                            onDomReady={onDomReady}
                            options={{
                                content:"<span class='wtf'>WTF</span>",
                                position: {
                                    // lat: 200,
                                    // lng: 200
                                    lat: parseFloat(activeBrendObject.address.latitude),
                                    lng: parseFloat(activeBrendObject.address.longitude)
                                },
                                // pixelOffset: null
                            }}
                            // options={{disableAutoPan: true}}
                        >
                                <MapCard
                                    markerData={activeBrendObject}
                                    directionsService={props.directionsService}
                                    getRoutes={getRoutes}
                                />

                        </InfoWindow>
                    }

            </>
        </GoogleMap>
        {console.log('???', props)}

    </>
});

export default MapWithADirectionsRenderer;

type MapPropsType = {
    children: ReactNode
    directions: any
}
