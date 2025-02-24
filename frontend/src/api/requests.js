const DEFAULT_URL = "http://localhost:8000";

async function request(endpoint, method = "GET", data = {}) {
    const TG = window.Telegram.WebApp
    const options = {
        method: method,
        headers: {
            'Authorization': TG.initData,
            'Content-Type': 'application/json',
        },
        body: method === "GET" ? null : JSON.stringify(data),
    };

    const response = await fetch(`${DEFAULT_URL}/${endpoint}`, options);
    const json = await response.json();
    console.log(json);

    if (response.status === 200) {
        return json.data;
    } else {
        throw new Error(`Ошибка: ${response.status} - ${json.message || "Неизвестная ошибка"}`);
    }
}

export {request}