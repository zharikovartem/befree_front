import React, { useCallback, useEffect, useState } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, GoogleAPI, IMapProps, IMarkerProps, 
    // useJsApiLoader 
} from 'google-maps-react';
import { GoogleMapsReactPropsType } from './GoogleMapsReactContainer';
import MapCard from './MapCard/MapCard';
import { Button, Spin } from 'antd';
import { DirectionsRenderer  } from "react-google-maps";
import DirectionsRendererComponent from './DirectionsRendererComponent/DirectionsRendererComponent';
import { BaseThunkType } from '../../../Redux/store';
import { GeoDataType } from '../../../Redux/mapReducer';
import { url } from '../../../Api/API';

const apiKey = 'AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI'

type CoordinatesType = {
    lat: number
    lng: number
}

const GoogleMapsReact: React.FC<GoogleMapsReactPropsType & GoogleApiWrapperPropsType> = (props) => {

    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: 'AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI',
    //     libraries: ['places'],
    // })

    const [activeMarker, setActiveMarker] = useState<google.maps.Marker>()
    const [activeBrendObject, setactiveBrendObject] = useState<any>()
    const [selectedPlace, setSelectedPlace] = useState<any>()
    const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false)
    const [directions, setDirections] = useState<google.maps.DirectionsResult[]>()
    const [directionsService, setDirectionsService] = useState<any>()
    const [myCoords, setMyCoords] = useState<CoordinatesType>()

    useEffect(() => {
        getLocation()
    }, []);

    const getLocation = () => {
        if (!navigator.geolocation) {} else {
          navigator.geolocation.getCurrentPosition((position) => {
            setMyCoords({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
          }, () => {  });
        }
    }

    useEffect(() => {
        console.log('useEffect props.routes', props.routes);
        props.routes && setShowingInfoWindow(false)
        // props.google.maps.DirectionsRenderer()
    }, [props.routes]);

    const [coordinatesCopyId, setCoordinatesCopyId] = useState<number>()
    useEffect(() => {
        if (coordinatesCopyId) {
            activeBrendObject && navigator.clipboard.writeText('http://maps.google.com/?ie=UTF8&hq=&ll='+activeBrendObject.address.latitude+','+activeBrendObject.address.longitude+'&z=17')
            alert('вывести toast')
            setTimeout(() => {
                setCoordinatesCopyId(undefined)
            }, 100);
        }
    }, [coordinatesCopyId]);

    const [viewDistanceId, setViewDistanceId] = useState<number>()
    useEffect(() => {
        if (viewDistanceId) {
            // console.log(props);
            
            const start = new google.maps.LatLng(53.9416614, 27.6870295)
            const stop = new google.maps.LatLng(activeBrendObject.address.latitude, activeBrendObject.address.longitude)

            props.calculateRoute(start, stop, directionsService)
            // calculateRoute2(start, stop, directionsService)

            setTimeout(() => {
                setViewDistanceId(undefined)
            }, 100);
        }
    }, [viewDistanceId]);

    const onMarkerClick = (id: number, mapkerProps?: IMarkerProps, marker?: google.maps.Marker, event?: any) => {
        setactiveBrendObject(props.brandObjectsList.filter(brandObject => brandObject.id === id)[0])
        setActiveMarker(marker)
        setSelectedPlace(mapkerProps)
        setShowingInfoWindow(true)
    }

    const onInfoWindowClose = () => {
        console.log('onInfoWindowClose')
        setShowingInfoWindow(false)
    }

    const onMapClicked = () => {
        console.log('onMapClicked')
    }

    const onMapRightClicked = () => {
        console.log('onMapRightClicked')
    }

    const onZoomChanged = (mapProps?: IMapProps | undefined, map?: google.maps.Map<Element> | undefined, event?: any) => {
        if (map) {
            const bounds: google.maps.LatLngBounds | null | undefined = map.getBounds()
            props.getBrendObjectsByBounds({
                lngMin: bounds ? bounds.getSouthWest().lng() : 0,
                lngMax: bounds ? bounds.getNorthEast().lng() : 0,
                latMin: bounds ? bounds.getSouthWest().lat() : 0,
                latMax: bounds ? bounds.getNorthEast().lat() : 0
            })
        }
    }

    const onReady = (mapProps?: IMapProps | undefined, map?: google.maps.Map<Element> | undefined, event?: any) => {
        const bounds: google.maps.LatLngBounds | null | undefined = map?.getBounds()
        console.log('mapProps', mapProps)
        console.log('map', map)
        console.log('event', event)

        setDirectionsService(mapProps?.google)
        
        if (bounds) {
            props.getBrendObjectsByBounds({
                lngMin: bounds ? bounds.getSouthWest().lng() : 0,
                lngMax: bounds ? bounds.getNorthEast().lng() : 0,
                latMin: bounds ? bounds.getSouthWest().lat() : 0,
                latMax: bounds ? bounds.getNorthEast().lat() : 0
            })
        } else {
            setTimeout(() => {
                onReady(mapProps, map, event)
            }, 100);
        }
    }

    const onPositionMarkerClick = (props?: IMarkerProps, marker?: google.maps.Marker, event?: any) => {
        alert('clik on me')
    }

    const memoizedHandleButtonClick = (ev: any) => {
        if (ev && ev.target && ev.target.classList.contains('onCoordinatesCopy') ) {
            coordinatesCopyId !== ev.target.attributes.getNamedItem('myid').value && setCoordinatesCopyId(ev.target.attributes.getNamedItem('myid').value)
        }
        if (ev && ev.target && ev.target.classList.contains('viewDistance') ) {
            viewDistanceId !== ev.target.attributes.getNamedItem('myid').value && setViewDistanceId(ev.target.attributes.getNamedItem('myid').value)
        }

        // ev && ev.target && console.log('memoizedHandleButtonClick', ev.target.classList)
        // ev && ev.target && ev.target.attributes.getNamedItem('myid') && console.log('memoizedHandleButtonClick', ev.target.attributes.getNamedItem('myid').value)
    }

    window.addEventListener('click', memoizedHandleButtonClick )

    if (!myCoords) {
        return <Spin size="large" />
    }

    return (
        <Map
            // style={{ width: '100%', height: '100%', position: 'relative' }}
            google={props.googleMap ? props.googleMap : props.google}
            zoom={14}
            onClick={onMapClicked}
            onRightclick={onMapRightClicked}
            initialCenter={myCoords}
            onZoomChanged={onZoomChanged}
            onReady={onReady}
            // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        >
            <Marker
                onClick={onPositionMarkerClick}
                label={'You\'re here'}
                position={{
                    lat: 53.9416614,
                    lng: 27.6870295
                }}
            />

            {props.brandObjectsList.map((brandObject) => {
                console.log(brandObject)
                return (
                    <Marker
                        onClick={(props?: IMarkerProps, marker?: google.maps.Marker, event?: any) => { onMarkerClick(brandObject.id, props, marker, event) }}
                        // label={brandObject.brandInfo.title}
                        // label={brandObject.id.toString()}
                        icon = {{
                            url: url+brandObject.brandInfo.category.markerFileName,
                            scaledSize: new google.maps.Size(45, 50),
                        }}
                        position={{
                            lat: brandObject.address.latitude,
                            lng: brandObject.address.longitude
                        }}
                    />
                )
            })}

            {/* {activeMarker &&
                <InfoWindow
                    marker={activeMarker}
                    // @ts-ignore
                    onClose={onInfoWindowClose}
                    visible={showingInfoWindow}
                    // onClick={()=>console.log('???')}

                >
                    <div style={{ width: 350 }}>
                        <MapCard
                            markerData={activeBrendObject}
                        />
                    </div>

                </InfoWindow>
            } */}

            {/* <DirectionsRendererComponent directionsService={directionsService} routes={props.routes}/> */}

            { props.routes && console.log('!!!', props.routes) &&
                <DirectionsRenderer 
                    directions={props.routes}
                    // routeIndex={0}
                    onDirectionsChanged={()=>console.log('!!!')}
                />
            }
            
                

        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: (apiKey)
})(GoogleMapsReact)

type GoogleApiWrapperPropsType = {
    google: GoogleAPI
    loaded?: boolean
}
