import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useTelegram} from './hooks/useTelegram';
import {request} from './api/requests';
import UserPanel from './components/UserPanel';
import Task from './components/Task';
import Navigation from './components/Navigation';
import Quests from './components/Quests';
import Theory from './components/Theory';
import Statistics from './components/Statistics';
import Equations from './components/Equations';
import BalancePanel from './components/BalancePanel';


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

const useApiUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('users/me', 'GET');
                setUser(response);
            } catch (err) {
                setError(err);
                console.error('Failed to fetch user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {user, loading, error};
};

const App = () => {
    const {username, avatarUrl} = useUserData();
    const {user, loading, error} = useApiUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <header className="top-panel">
                <UserPanel username={username} avatarUrl={avatarUrl}/>
                <div className="decor-border"></div>
                <BalancePanel balance={user?.points}/>
            </header>
            <main className="content">
                <Routes>
                    <Route index element={<Task/>}/>
                    <Route path="equations" element={<Equations/>}/>
                    <Route path="quests" element={<Quests/>}/>
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