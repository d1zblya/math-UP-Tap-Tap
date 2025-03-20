import axios from 'axios';

const DEFAULT_URL = "https://mathup.ru/api"; // URL api

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
            return response.data;
        } else if (response.status === 401 || response.status === 500) {
            TG.close()
        } else {
            throw new Error(`Ошибка: ${response.status} - ${response.data.message || "Неизвестная ошибка"}`);
        }

    } catch (error) {
        if (error.status === 401 || error.status === 500) {
            TG.close()
        }
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

export {request};