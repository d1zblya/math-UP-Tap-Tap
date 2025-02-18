import React, {useEffect, useState} from 'react'
import UserPanel from './components/UserPanel.jsx';
import Task from './components/Task.jsx';
import Navigation from './components/Navigation.jsx';
import {useTelegram} from "./hooks/useTelegram.js";
import {Route, Routes} from "react-router-dom";
import Quests from "./components/Quests.jsx";
import Theory from "./components/Theory.jsx";
import Statistics from "./components/Statistics.jsx";
import Equations from "./components/Equations.jsx";
import BalancePanel from "./components/BalancePanel.jsx";

function App() {
    const [username, setUsername] = useState('Guest');
    const [avatarUrl, setAvatarUrl] = useState('https://fikiwiki.com/uploads/posts/2022-02/1644862081_1-fikiwiki-com-p-kuritsi-krasivie-kartinki-2.jpg'); // Заглушка для аватарки)

    const {tg} = useTelegram();
    useEffect(() => {
        if (tg.initDataUnsafe.user) {
            const user = tg.initDataUnsafe.user;
            setUsername(user.first_name);
            setAvatarUrl(user.photo_url);
        }
    }, []);


    return (
        <div className="container">
            <header className="top-panel">
                <UserPanel username={username} avatarUrl={avatarUrl}/>
                <div className="decor-border"></div>
                <BalancePanel/>
            </header>
            <main className="content">
                <Routes>
                    <Route index element={<Task/>}/>
                    <Route path={'equations'} element={<Equations/>}/>
                    <Route path={"quests"} element={<Quests/>}/>
                    <Route path={"theory"} element={<Theory/>}/>
                    <Route path={"statistics"} element={<Statistics/>}/>
                </Routes>
            </main>
            <footer className="navigation">
                <Navigation/>
            </footer>
        </div>
    );
}


export default App
