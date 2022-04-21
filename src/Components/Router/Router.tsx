import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainContainer from '../../Containers/MainContainer/MainContainer'
import MainPage from '../Main/MainPage'
import TestMap from '../MapPage/GoogleMapsReact/TestMap'
import MapPage from '../MapPage/MapPageContainer'
import TestMapPage from '../MapPage/TestMapPageContainer'

const api = "AIzaSyArMpYW9CPdpuWvJwcn7C_1bPSr7aetxnI";

const Router: React.FC<RouterPropsType> = (props) => {

    return (
        <MainContainer>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    {/* <Route index element={<>Home</>} />
                        <Route path="map" element={<MapPage />}>
                        <Route path=":teamId" element={<>Team</>} />
                        <Route path="new" element={<>NewTeamForm</>} />
                        <Route index element={<>LeagueStandings</>} />
                    </Route> */}
                </Route>
                <Route path="/testmap" element={<MapPage />}>

                </Route>

                <Route path="/map" element={
                    <TestMapPage />
                }>

                </Route>
            </Routes>
        </MainContainer>
    )
}

export default Router

type RouterPropsType = {

}