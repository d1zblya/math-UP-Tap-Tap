import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import UserPanel from './components/layout/UserPanel/UserPanel.jsx';
import PlayPage from './pages/PlayPage/PlayPage.jsx';
import Navigation from './components/layout/Navigation/Navigation.jsx';
import QuestsPage from './pages/QuestsPage/QuestsPage.jsx';
import TheoryPage from './pages/TheoryPage/TheoryPage.jsx';
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import LevelsPage from "./pages/LevelsPage/LevelsPage.jsx";
import DifficultySelector from "./components/play/DifficultySelector/DifficultySelector.jsx";


const useUserData = () => {
    const [username, setUsername] = useState('Guest');
    const [avatarUrl, setAvatarUrl] = useState(
        'https://fikiwiki.com/uploads/posts/2022-02/1644862081_1-fikiwiki-com-p-kuritsi-krasivie-kartinki-2.jpg'
    );
    const tg = window.Telegram.WebApp;

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
                    <Route index element={<DifficultySelector/>}/>
                    <Route path="play" element={<PlayPage/>}/>
                    <Route path="levels" element={<LevelsPage/>}/>
                    <Route path="quests" element={<QuestsPage/>}/>
                    <Route path="theory" element={<TheoryPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                </Routes>
            </main>
            <footer className="navigation">
                <Navigation/>
            </footer>
        </div>
    );
};

export default App;