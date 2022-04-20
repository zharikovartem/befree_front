import { url } from "../../../Api/API"

export const addBrandObjectsToMarkers = (
    map: google.maps.Map,
    brandObjectsList: any[],
    googleMarkers: google.maps.Marker[],
    setGoogleMarkers: React.Dispatch<React.SetStateAction<google.maps.Marker[]>>,
    setMarkers: (newMarkers: google.maps.Marker[]) => void
) => {
    let newMarkers: google.maps.Marker[] = [...googleMarkers]

    brandObjectsList.map( (brandObject: any) => {
        const marker = createMarker(map, brandObject)
        console.log(marker.getPosition())
        newMarkers.push(marker)
    })
    setMarkers(newMarkers)
}

export const createMarker = (map: google.maps.Map, brandObject: any):google.maps.Marker => {
    return new google.maps.Marker({
        position: {
            lat: parseFloat(brandObject.address.latitude),
            lng: parseFloat(brandObject.address.longitude)
        },
        map: map,
        icon: getIconAttributes('red'),
        label: brandObject.brandInfo.title,
        // @ts-ignore
        id: brandObject.id
    })
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