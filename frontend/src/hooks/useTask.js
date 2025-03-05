import { useState, useEffect } from 'react';
import { request } from '../api/requests';

export const useTask = () => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTask = async () => {
        try {
            const response = await request('tasks/simple-examples', 'GET');
            setTask(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    return { task, loading, error, fetchTask };
};