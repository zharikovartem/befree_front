import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RouterComponent from './Components/Router/Router';
import store from './Redux/store';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import React from 'react';

export const MyContext = React.createContext('light');

function App() {
    return (
        // <Router location={''} navigator={undefined}>
        <BrowserRouter>
            <Provider store={store} >
                <RouterComponent />
            </Provider>
        </BrowserRouter>
        // </Router>
    );
}

export default App;
