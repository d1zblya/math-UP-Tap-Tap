import React from 'react';
import {useNavigate} from "react-router-dom";

function Navigation() {
    let navigate = useNavigate();
    return (
        <nav className="nav">
            <button className='navigation-link' onClick={() => navigate("/")}>2+2</button>
            <button className='navigation-link' onClick={() => navigate("/equations")}>X/Y</button>
            <button className='navigation-link' onClick={() => navigate("/quests")}>Квесты</button>
            <button className='navigation-link' onClick={() => navigate("/theory")}>Теория</button>
            <button className='navigation-link' onClick={() => navigate("/statistics")}>Стат</button>
        </nav>
    );
}

export default Navigation;
