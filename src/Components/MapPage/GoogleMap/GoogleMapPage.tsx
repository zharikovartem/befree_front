import React, {useEffect, useRef, useState} from 'react'
import { GoogleMapPagePropsType } from './GoogleMapPageContainer'
import {withScriptjs, withGoogleMap} from 'react-google-maps'
import './GoogleMapPage.css'
import { addBrandObjectsToMarkers } from './BrandObjectHelper'

interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean
}

type GoogleLatLng = google.maps.LatLng
type GoogleMap = google.maps.Map
type GoogleMarker = google.maps.Marker;

type CoordinatesType = {
    lat: number
    lng: number
}

const GoogleMapPage:React.FC<GoogleMapPagePropsType> = (props) => {

    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<GoogleMap>()
    const [myCoords, setMyCoords] = useState<CoordinatesType>()
    // const [myPosition, setMyPosition] = useState<google.maps.LatLng>()
    const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
    const [LastLineHook, setLastLineHook] = useState<google.maps.Polyline>();
    const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);

    const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
    const [addedIds, setAddedIds] = useState<number[]>([])

    // console.log('homeMarker', homeMarker?.getPosition()?.lat(), homeMarker?.getPosition()?.lng());

    const setMarkers = (newMarkers: google.maps.Marker[]) => {
        console.log('setMarkers', newMarkers)
        console.log('googleMarkers', [...googleMarkers])
        setGoogleMarkers([]);
        
        newMarkers.forEach((googleMarker) => {
            // @ts-ignore
            if(!addedIds.includes(googleMarker.id)) {
                // @ts-ignore
                console.log('added title: ', googleMarker.id)

                googleMarker.addListener('click', () => {
                    alert('Отрисовать карточку')
                })

                setGoogleMarkers(googleMarkers => [...googleMarkers, googleMarker])

                let newAddedIds = [...addedIds]
                // @ts-ignore
                newAddedIds.push(googleMarker.id)
                setAddedIds(newAddedIds)
            }
        });
    }
    
    useEffect(() => {
        map && addBrandObjectsToMarkers(
            map, 
            props.brandObjectsList, 
            googleMarkers,
            setGoogleMarkers,
            setMarkers
        )
    }, [props.brandObjectsList]);

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        myCoords && startmap()
    }, [myCoords]);

    useEffect(() => {
        listenerIdArray.forEach((listenerId) => {
           google.maps.event.removeListener(listenerId);
        });

        setListenerIdArray([]);
        setGoogleMarkers([]);
        console.log('googleMarkers', googleMarkers)
        googleMarkers.forEach((googleMarker) => {
            const markerPosition = googleMarker.getPosition();
            if (markerPosition) {
                console.log('!!!!')
                addMarker(markerPosition);
            }
        });
    // }, [googleMarkers]);
    }, [LastLineHook]);

    useEffect(() => {
        if ( homeMarker && homeMarker.getPosition() ) {
            // @ts-ignore
            addMarker(new google.maps.LatLng(homeMarker.getPosition().lat(), homeMarker.getPosition().lng()));
        }
    }, [homeMarker]);

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

    const startmap = () => {
        if (!map) {
            defaultMapStart()
        } else {
            if (myCoords) {
                const homeLocation = new google.maps.LatLng(myCoords.lat, myCoords.lng);
                setHomeMarker(addHomeMarker(homeLocation));
            }
            
        }
    }

    const defaultMapStart = () => {
        if (myCoords) {
            const defaultAdress = new google.maps.LatLng(myCoords.lat, myCoords.lng);
            console.log('defaultAdress: ', defaultAdress)
            initMap(18, defaultAdress)
            setHomeMarker(addHomeMarker(defaultAdress));
        }       
    }

    const initMap = ( zoomLevel: number, adress: GoogleLatLng ) => {
        if (ref.current) {
            console.log('initMap', adress.lat(), adress.lng());

            const map = new google.maps.Map(
                ref.current, 
                {
                    zoom: zoomLevel,
                    center: adress,
                    mapTypeControl: props.mapTypeControl,
                    streetViewControl: false,
                    zoomControl: true,
                    mapTypeId: props.mapType,
                }
            )

            // Получаем крайние точки при их изменениях
            map.addListener('bounds_changed', ()=>{
                const bounds: google.maps.LatLngBounds | null | undefined = map.getBounds()
                props.getBrendObjectsByBounds({
                    lngMin: bounds ? bounds.getSouthWest().lng() : 0,
                    lngMax: bounds ? bounds.getNorthEast().lng() : 0,
                    latMin: bounds ? bounds.getSouthWest().lat() : 0,
                    latMax: bounds ? bounds.getNorthEast().lat() : 0
                })
            })
            setMap(map)
        }
    }

    const getIconAttributes = (iconColor: string) => {
        return {
            // path: 'M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z',
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
            fillColor: iconColor,
            fillOpacity: 0.8,
            strokeColor: 'pink',
            strokeWeight: 2,
            scaledSize: new google.maps.Size(45, 50),
        };
    };

    const addMarker = (location: GoogleLatLng, isMy?: boolean): void => {
        console.log('addMarker', map);
        const marker:GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: getIconAttributes('red'),
            label: 'You\'re here',
        });

        if (isMy) {
            console.log('111');
            homeMarker && setGoogleMarkers(googleMarkers => [...googleMarkers, homeMarker]);
        } else {
            console.log('222');
            setGoogleMarkers(googleMarkers => [...googleMarkers, marker]);
        }

        const listenerId = marker.addListener('click', () => {
            const homePos = homeMarker?.getPosition();
            const markerPos = marker.getPosition();
            console.log(homePos)
            console.log(markerPos)
            if (homePos && markerPos) {

                console.log(google);
                console.log(map?.getBounds());
                
                const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(homePos, markerPos);
                // setDistanceInKm(Math.round(distanceInMeters / 1000));

                if (LastLineHook) {
                    LastLineHook.setMap(null);
                }

                if (map?.getZoom() === 22) {
                    map?.setZoom(10)
                } else {
                    map?.setZoom(22)
                }
                

                // const line = new google.maps.Polyline({
                //     path: [
                //         { lat: homePos.lat(), lng: homePos.lng()},
                //         { lat: markerPos.lat(), lng: markerPos.lng()},
                //     ],
                //     icons: [
                //         {
                //             icon: {
                //                 path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                //             },
                //             offset: "100%"
                //         }
                //     ],
                //     map: map,
                // });

                // setLastLineHook(line);
            }
        })

        setListenerIdArray(listenerIdArray => [...listenerIdArray, listenerId]);
    }

    const addHomeMarker = (location: GoogleLatLng, map?: any): GoogleMarker => {
            const homeMarkerConst:GoogleMarker = new google.maps.Marker({
                position: location,
                map: map,
                icon: {
                    url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dmap%2BMarker&psig=AOvVaw02K6nL6OBf3FG1ZSXlVUsf&ust=1648051167035000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPj55pWL2vYCFQAAAAAdAAAAABAD'
                }
            });
    
            homeMarkerConst.addListener('click', () => {
                map?.panTo(location)
                map?.setZoom(20)
            });
    
            return homeMarkerConst        
    }

    return (
        <div className='map-container'>
            <div ref={ref} className='map-container_map'>
            </div>
        </div>
    )
}

export default  GoogleMapPage