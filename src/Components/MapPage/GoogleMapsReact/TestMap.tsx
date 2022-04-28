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
import MapMenu from "../MapMenu/MapMenuContainer";
import { notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MapMenuDrower from "./MapMenuDrower/MapMenuDrower";
import { IMapProps, IMarkerProps } from "google-maps-react";
import { url } from "../../../Api/API";
import MapCard from "./MapCard/MapCard";
import { CoordinatesType } from "../../../Redux/mapReducer";
import AtmCard from "./AtmCard/AtmCard";
import { AtmType } from "../../../Redux/brendObjectReducer";
import NavigatePanel from "./NavigatePanel/NavigatePanel";

/*global google*/

const MapWithADirectionsRenderer = compose(
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            console.log('!!!componentDidMount', this.state)
            // @ts-ignore
            !this.state.bounds && this.props.getBrendObjectsByBounds({
                // @ts-ignore
                lngMin: parseFloat(this.props.myCoords.lng) - 0.04,
                // @ts-ignore
                lngMax: parseFloat(this.props.myCoords.lng) + 0.04,
                // @ts-ignore
                latMin: parseFloat(this.props.myCoords.lat) - 0.04,
                // @ts-ignore
                latMax: parseFloat(this.props.myCoords.lat) + 0.04
            })
        },

        componentWillMount() {
            console.log('!!!componentWillMount')
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

                onCenterChanged: (coordinates: CoordinatesType) => {
                    console.log('onCenterChanged', this.props);

                    // @ts-ignore
                    !this.state.bounds && this.props.getBrendObjectsByBounds({
                        // @ts-ignore
                        lngMin: parseFloat(coordinates.lng) - 0.04,
                        // @ts-ignore
                        lngMax: parseFloat(coordinates.lng) + 0.04,
                        // @ts-ignore
                        latMin: parseFloat(coordinates.lat) - 0.04,
                        // @ts-ignore
                        latMax: parseFloat(coordinates.lat) + 0.04
                    })

                },

                onSetNewRuots: (coordinates: CoordinatesType) => {
                    console.log('onSetNewRuots', coordinates)
                    console.log('onSetNewRuots props', this.props)
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
            // console.log('!!!componentWillUpdate', this.props);
            // console.log('componentWillUpdate', this.state);
            // // @ts-ignore
            // if(!this.state.needToCloseAll) {
            //     this.setState({
            //         needToCloseAll: false
            //     })
            // }
        },

        componentDidUpdate() {
            console.log('!!!componentDidUpdate props', this.props)
            console.log('!!!componentDidUpdate state', this.state)
            // @ts-ignore
            console.log('!!!', this.props.pathCoordinates)
            // @ts-ignore
            console.log('!!!', !this.state.tryRoute)

            // @ts-ignore
            if (this.state.directions && this.props.pathCoordinates && this.props.pathCoordinates.routes && this.state.directions.routes 
                // @ts-ignore
                && this.state.directions.routes !== this.props.pathCoordinates.routes) 
            {
                // alert('NEW')
                this.setState({
                    // @ts-ignore
                    directions: this.props.pathCoordinates,
                    tryRoute: true,
                })
            }

            // @ts-ignore
            if (this.props.pathCoordinates && !this.state.tryRoute) {
                console.log('componentDidUpdate', this.props);
                this.setState({
                    tryRoute: true,
                    // @ts-ignore
                    directions: this.props.pathCoordinates,
                    // needToCloseAll: false
                });
            } else {

            }

            // @ts-ignore
            if (this.props.pathCoordinates === undefined && this.state.tryRoute) {
                console.log('ОБРЕЗАЕТ ЗДЕСЬ',this.props)
                this.setState({
                    tryRoute: false,
                    // @ts-ignore
                    directions: false,
                    // needToCloseAll: false
                });
            }
            
            // // @ts-ignore
            // if (this.props.pathCoordinates !== undefined 
            //     // @ts-ignore
            //     && this.props.pathCoordinates.routes 
            //     // @ts-ignore
            //     && this.props.pathCoordinates.routes.length > 0
            //     // @ts-ignore
            //     && this.state.tryRoute) 
            // {
            //     this.setState({
            //         // @ts-ignore
            //         directions: this.props.pathCoordinates,
            //         tryRoute: false,
            //     })
            // }
        }
    })
)((props: any) => {


    const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false)
    const [activeBrendObject, setActiveBrendObject] = useState<any>()
    const [activeAtm, setActiveAtm] = useState<AtmType | null>(null)
    const [center, setCenter] = useState<any>(props.myCoords)
    const [requests, setRequests] = useState<number>(0)
    const [waitForShowing, setWaitForShowing] = useState<boolean>(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)
    // const [isDirections, setIsDirections] = useState<boolean>(!!props.directions)
    const [directions, setDirections] = useState<any>(props.directions)

    console.log('???!!!: ', props.markersBrand)

    useEffect(() => {
        console.log('!!props.directions', props.directions)
        if (props.directions !== undefined) {
            console.log('+++')
            setDirections(props.directions)
        }
    }, [props.directions, props.directions?.routes]);

    useEffect(() => {
        console.log('useEffect', props.markersBrand)
        waitForShowing && setShowingInfoWindow(true)
        setWaitForShowing(false)
        if (requests !== 0) {
            setRequests(requests - 1)
        }
    }, [props.markersBrand]);

    const onBoundsChanged = (from: string) => {
        console.log('!!!requests ++ (' + from + ')')
        setRequests(requests + 1)
        props.onBoundsChanged()
    }

    console.log('!!!requests', requests)

    const clickOmMe = () => {
        alert('You\'re here')
    }

    const onMarkerClick = (id: number) => {
        console.log('onMarkerClick')
        const targetBrendObject = props.markersBrand.filter((brandObject: any) => brandObject.id === id)[0]
        if (targetBrendObject) {
            showingInfoWindow && setShowingInfoWindow(false)
            const newCenter = {
                lat: parseFloat(targetBrendObject.address.latitude),
                lng: parseFloat(targetBrendObject.address.longitude),
            }
            console.log('newCenter', newCenter)

            setCenter(newCenter)
            setActiveAtm(null)
            setActiveBrendObject(targetBrendObject)
            setWaitForShowing(true)
            // props.onBoundsChanged()
            onBoundsChanged('onMarkerClick')
        }
    }

    const onAtmClick = (id: number) => {
        console.log(id)
        const atm = props.markersAtm.filter((atm: any) => atm.id === id)[0]
        console.log(atm)
        if (atm) {
            showingInfoWindow && setShowingInfoWindow(false)
            const newCenter = {
                lat: parseFloat(atm.address.latitude),
                lng: parseFloat(atm.address.longitude),
            }
            setCenter(newCenter)
            setActiveBrendObject(null)
            setActiveAtm(atm)
            setWaitForShowing(true)
            onBoundsChanged('onAtmClick')
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
        console.log('getRoutes calculateRoute result', routesResp)
        props.getRoutes(routesResp)
        // props.getRoutes(routesResp)
    }

    const onDragStart = () => {
        console.log('onDragStart')
        // setShowingInfoWindow(false)
    }

    const onDragEnd = () => {
        console.log('onDragEnd', props.bounds);
        // props.onBoundsChanged()
        onBoundsChanged('onDragEnd')
        // setShowingInfoWindow(true)
    }

    const onZoomChanged = () => {
        console.log('onZoomChanged', props.bounds);
        setShowingInfoWindow(false)
        // props.onBoundsChanged()
        onBoundsChanged('onZoomChanged')
    }

    const onInfoWindowPositionChanged = () => {
        console.log('onInfoWindowPositionChanged')
    }

    const onNotificationClick = () => {
        console.log('onNotificationClick directions', { ...directions })
        console.log('onNotificationClick props', props)

        let directionsCopy = { ...directions }
        directionsCopy.routes = []
        console.log(directionsCopy)
        // props.clearDirections()
        // setIsDirections(false)
        setDirections({
            ...props.directions,
            routes: []
        })
    }

    const openNotification = () => {
        // notification.open({
        //     top: undefined,
        //     message: 'Notification Title',
        //     description:
        //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        //     onClick: onNotificationClick,
        //     duration: 0,
        // });
    }

    if (props.directions) {
        if (!isNotificationOpen) {
            setIsNotificationOpen(true)
            openNotification()
        }
    }

    const onDirectionsChanged = () => {
        console.log('onDirectionsChanged')
    }

    // const setCenter = (coordinates: CoordinatesType) => {

    // }

    const onReload = () => {
        console.log('onReload')
        // alert('onReload')
        onBoundsChanged('onReload')
    }

    return <>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={props.myCoords}
            center={center}
            // onZoomChanged={onZoomChanged}
            // @ts-ignore
            // onBoundsChanged={onMapBoundsChanged}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onZoomChanged={onZoomChanged}
            // ref={mapRef}

            ref={props.onMapMounted}
        >
            <MapMenuDrower
                isDrawerVisible={props.isDrawerVisible}
                getDawerVisible={props.getDawerVisible}
                setCenter={(data) => {
                    setCenter(data)
                    // onBoundsChanged('123456789')
                    props.onCenterChanged(data)
                }}
                setRoute={(data)=>{props.onSetNewRuots(data)}}
                myCoords={props.myCoords}
                getRoutes={getRoutes}
                onReload={onReload}
            />

            <NavigatePanel 
                directions={directions}
                setDirections={setDirections}
            />

            <>
                <Marker
                    onClick={clickOmMe}
                    label={{ text: 'You\'re here' }}
                    position={props.myCoords}
                />

                {props.markersBrand.map((brandObject: any) => {
                    // console.log('???', brandObject.id, brandObject)
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

                {props.markersAtm.map((atm: any) => {
                    console.log('???atm', atm.id, atm)
                    return (
                        <Marker
                            onClick={() => { onAtmClick(atm.id) }}
                            icon={{
                                url: 'https://befree.com/marker_ATM.png',
                                scaledSize: new google.maps.Size(45, 50),
                            }}
                            position={{
                                lat: parseFloat(atm.address.latitude),
                                lng: parseFloat(atm.address.longitude)
                            }}
                        />
                    )
                })}

                {
                    props.directions && // console.log('!!!!!!!!', isDirections) &&
                    // isDirections &&
                    <DirectionsRenderer
                        directions={directions}
                        // onDirectionsChanged={onDirectionsChanged}
                        options={{
                            // draggable: true,
                            // @ts-ignore
                            // panel: <div>panel</div>
                            // suppressInfoWindows: true
                        }}
                    />
                }

                {console.log('InfoWindow', { ...props })}
                {console.log('showingInfoWindow', showingInfoWindow)}
                {
                    // !props.needToCloseAll &&
                    !props.isDrawerVisible &&
                    showingInfoWindow &&
                    <InfoWindow
                        position={{
                            lat: parseFloat(activeBrendObject ? activeBrendObject.address.latitude : activeAtm?.address.latitude),
                            lng: parseFloat(activeBrendObject ? activeBrendObject.address.longitude : activeAtm?.address.longitude)
                        }}
                        onPositionChanged={onInfoWindowPositionChanged}
                        onCloseClick={onInfoWindowClose}
                        onDomReady={onDomReady}
                    >
                        {/* {activeBrendObject && */}
                            <MapCard
                                markerData={activeBrendObject}
                                atmData={activeAtm}
                                directionsService={props.directionsService}
                                getRoutes={getRoutes}
                                myCoords={props.myCoords}
                                addSuccess={props.addSuccess}
                                addError={props.addError}
                            />
                        {/* }
                        {activeAtm && <AtmCard />} */}

                    </InfoWindow>
                }

            </>
        </GoogleMap>
    </>
});

export default MapWithADirectionsRenderer;

type MapPropsType = {
    children: ReactNode
    directions: any
}
