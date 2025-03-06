import { useState, useEffect } from 'react';
import { request } from '../api/requests';

export const useApiDailyQuests = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dailyQuests, setDailyQuests] = useState(null);


    const fetchDailyQuests = async () => {
        try {
            const response = await request('quests/daily', 'GET');
            setDailyQuests(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyQuests();
    }, []);

    return { dailyQuests, loading, error, fetchDailyQuests};
};