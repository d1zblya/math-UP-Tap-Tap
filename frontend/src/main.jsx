import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
// import WebApp from "@twa-dev/sdk";
//
// WebApp.MainButton.hide();
// WebApp.expand();
// WebApp.ready();



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <>
            <App/>
        </>
    </BrowserRouter>
)
