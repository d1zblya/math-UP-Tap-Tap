import {useEffect, useState} from 'react';
import {request} from '../api/requests';

export const useApiUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await request('users/me', 'GET');
            setUser(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return {user, loading, error, fetchUser};
};