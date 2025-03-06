import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useTelegram} from './hooks/useTelegram';
import UserPanel from './components/UserPanel';
import Play from './components/Play.jsx';
import Navigation from './components/Navigation';
import QuestsPage from './components/QuestsPage';
import Theory from './components/Theory';
import Statistics from './components/Statistics';
import Equations from './components/Equations';


const useUserData = () => {
    const [username, setUsername] = useState('Guest');
    const [avatarUrl, setAvatarUrl] = useState(
        'https://fikiwiki.com/uploads/posts/2022-02/1644862081_1-fikiwiki-com-p-kuritsi-krasivie-kartinki-2.jpg'
    );
    const {tg} = useTelegram();

    useEffect(() => {
        if (tg.initDataUnsafe?.user) {
            const {first_name, photo_url} = tg.initDataUnsafe.user;
            setUsername(first_name);
            setAvatarUrl(photo_url);
        }
    }, [tg]);

    return {username, avatarUrl};
};


const App = () => {
    const {username, avatarUrl} = useUserData();

    return (
        <div className="container">
            <header className="top-panel">
                <UserPanel username={username} avatarUrl={avatarUrl}/>
            </header>
            <main className="content">
                <Routes>
                    <Route index element={<Play/>}/>
                    <Route path="equations" element={<Equations/>}/>
                    <Route path="quests" element={<QuestsPage/>}/>
                    <Route path="theory" element={<Theory/>}/>
                    <Route path="statistics" element={<Statistics/>}/>
                </Routes>
            </main>
            <footer className="navigation">
                <Navigation/>
            </footer>
        </div>
    );
};

export default App;