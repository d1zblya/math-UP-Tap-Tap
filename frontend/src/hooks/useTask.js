import {useEffect, useState} from 'react';
import {request} from '../api/requests';

export const useTask = (difficulty) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let url = "tasks/easy-examples";
    if (difficulty === "medium") {
        url = "tasks/medium-examples";
    } else if (difficulty === "hard") {
        url = "tasks/hard-examples";
    }
    const fetchTask = async () => {
        try {
            const response = await request(url, 'GET');
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

    return {task, loading, error, fetchTask};
};