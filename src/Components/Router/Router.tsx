import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainContainer from '../../Containers/MainContainer/MainContainer'
import CreateObject from '../CreateObject/CreateObjectContainer'
import MainPage from '../Main/MainPage'
import TestMapPage from '../MapPage/MapPageContainer'

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

                <Route path="/create_object" element={<CreateObject />} />

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