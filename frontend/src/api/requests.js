const DEFAULT_URL = "http://localhost:8000";

const TG = window.Telegram.WebApp

async function request(endpoint, method = "GET", data = {}) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": TG.initData,
        },
        body: data ? JSON.stringify(data) : null,
    }

    const response = await fetch(`${DEFAULT_URL}/${endpoint}`, options)
    const json = await response.json()
    console.log(json)
    if (response.status === 200) {
        return json.data
    }
}

export {TG, request}