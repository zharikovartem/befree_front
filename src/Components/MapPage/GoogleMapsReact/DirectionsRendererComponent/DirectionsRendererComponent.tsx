import React from 'react'
import { DirectionsRenderer  } from "react-google-maps";

const DirectionsRendererComponent: React.FC<DirectionsRendererComponentPropsType> = (props) => {

    console.log('DirectionsRendererComponent', props)

    const onDirectionsChanged = () => {
        console.log('onDirectionsChanged');
        
    }

    if (props.routes === undefined) {
        console.log('DirectionsRendererComponent undefined')
        return null
    }

    return (
        <props.directionsService.maps.DirectionsRenderer
            directions={props.routes}
            routeIndex={0}
            defaultOptions={{
                suppressMarkers: true
            }}
            onDirectionsChanged={onDirectionsChanged}
        />
    )
}

export default DirectionsRendererComponent

type DirectionsRendererComponentPropsType = {
    routes: google.maps.DirectionsResult | undefined
    directionsService: any
}