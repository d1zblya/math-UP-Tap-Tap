import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

const TG = window.Telegram.WebApp;
TG.MainButton.hide()
TG.expand()
TG.ready()


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <>
            <App/>
        </>
    </BrowserRouter>
)
