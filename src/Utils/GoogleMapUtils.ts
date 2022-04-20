export const loadMapApi = () => {
    // const apiKey = 'AIzaSyD7Q82l2QjSzJJk1uUW3OzUBGPTlbk8w1g'
    const apiKey = 'AIzaSyB_vVYIMH755m27cg0rwGPcr_yh3T8xVVo'
    const mapsURL = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&&libraries=geometry&v=weekly' // 
    // const mapsURL = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&callback=initMap&libraries=&v=weekly' // 
    // const mapsURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7Q82l2QjSzJJk1uUW3OzUBGPTlbk8w1g&libraries=&v=weekly" // не проходит ключ
    // const mapsURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7Q82l2QjSzJJk1uUW3OzUBGPTlbk8w1g"

    const scripts = document.getElementsByTagName('script')

    for (let index = 0; index < scripts.length; index++) {
        const element = scripts[index]
        if (element.src.indexOf(mapsURL) === 0) {
            return element
        }
    }

    const googleMapScript = document.createElement('script')
    googleMapScript.src = mapsURL
    googleMapScript.async = true
    googleMapScript.defer = true

    window.document.body.appendChild(googleMapScript)

    return googleMapScript
}