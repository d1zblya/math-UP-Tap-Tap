import {useEffect, useState} from 'react';
import {request} from '../api/requests';

export const useApiMathQuests = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mathQuests, setMathQuests] = useState(null);


    const fetchMathQuests = async () => {
        try {
            const response = await request('quests/math', 'GET');
            setMathQuests(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    w

    useEffect(() => {
        fetchMathQuests();
    }, []);

    return {mathQuests, loading, error, fetchMathQuests};
};