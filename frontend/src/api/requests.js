import axios from 'axios';

const DEFAULT_URL = ""; // URL api

async function request(endpoint, method = "GET", data = {}) {
    const TG = window.Telegram.WebApp;
    try {
        const response = await axios({
            method: method.toLowerCase(),
            url: `${DEFAULT_URL}/${endpoint}`,
            headers: {
                'Authorization': TG.initData,
                'Content-Type': 'application/json',
            },
            data: method === "GET" ? null : data,
        });


        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error(`Ошибка: ${response.status} - ${response.data.message || "Неизвестная ошибка"}`);
        }

    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

export { request };