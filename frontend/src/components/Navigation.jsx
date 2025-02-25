import React from 'react';
import {useNavigate} from "react-router-dom";

function Navigation() {
    let navigate = useNavigate();
    return (
        <nav className="nav">
            <button className='navigation-link' onClick={() => navigate("/")}>
                <img className={"nav-icon"} src="/nav1.png" alt="главная"/>
                <span className={"nav-title"}>ГЛАВНАЯ</span>
            </button>
            <button className='navigation-link' onClick={() => navigate("/equations")}>
                <img className={"nav-icon"} src="/nav2.png" alt="уровни"/>
                <span className={"nav-title"}>УРОВНИ</span>
            </button>
            <button className='navigation-link' onClick={() => navigate("/quests")}>
                <img className={"nav-icon"} src="/nav3.png" alt="квесты"/>
                <span className={"nav-title"}>КВЕСТЫ</span>
            </button>
            <button className='navigation-link' onClick={() => navigate("/theory")}>
                <img className={"nav-icon"} src="/nav4.png" alt="теория"/>
                <span className={"nav-title"}>ТЕОРИЯ</span>
            </button>
            <button className='navigation-link' onClick={() => navigate("/statistics")}>
                <img className={"nav-icon"} src="/nav5.png" alt="профиль"/>
                <span className={"nav-title"}>ПРОФИЛЬ</span>
            </button>
        </nav>
    );
}

export default Navigation;
