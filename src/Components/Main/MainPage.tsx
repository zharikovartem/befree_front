import React, { useEffect, useState } from 'react'
import Filter from '../../Containers/FilterContainer/FilterContainer'
import GoogleMapsReact from '../MapPage/GoogleMapsReact/GoogleMapsReactContainer'
import { MainPagePropsType } from './MainPageContainer'
import MainPageFilter from './MainPageFilter/MainPageFilter'

const MainPage:React.FC<MainPagePropsType> = (props) => {

    const [myCoords, setMyCoords] = useState<google.maps.LatLngLiteral>()

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

    return (
        <>
            {/* <Filter 
                children={<>MainPage</>}
                filter={<MainPageFilter/>}
                // filter={<>MainPageFilter</>}
            /> */}
            
            {/* {myCoords && <div><GoogleMapsReact 
                initialCenter={myCoords}
            /></div>} */}
            <div
                style={{
                    zIndex:100,
                    position: 'absolute'
                }}
            >
                MainPage
            </div>
        </>
    )
}

export default MainPage